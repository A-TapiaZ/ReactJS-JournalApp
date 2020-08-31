import { types } from "../types/types";
import Swal from 'sweetalert2';
import {firebase, googleAuthProvider} from '../firebase/firebaseConfig';
import { startLoading, finishLoading } from "./ui";
import { notesLougout } from "./notes";

// TAREA ASINCRONA
export const startRegisterWithEmailPasswordName=(email,password,name) => {
  // Este dispatch lo provee el thunk (middelware)
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email,password)
      // Conociendo que es lo que retorna la peticion, puedo desestructurar directamente sobre la respuesta
      // Al ser un correo que no me retorna un displayname, puedo hacer que este tome el nombre del formulario de registro, solo que es una funcion asincrona por lo que debo poner el async
      // Practicamente me retorna un null de cuando me registro, porque la unica forma de obtener el nombre es cuando se registran por medio de redes sociales, de lo contrario la unica forma de saber el nombre es cuando es ingresado en el formulario.
      .then(async({user}) => {
        console.log(user);
        if (user.displayName===null) {
          await user.updateProfile({displayName:name})
        }
        dispatch(login(user.uid, user.displayName))
      }).catch((err) => {
      console.log(err);
      Swal.fire('Error', err.message, 'error' );
      });
  }
}

export const startLoginEmailPassword= (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())
    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(({user}) => {
        console.log(user);
        dispatch(login(user.uid, user.displayName))
        // Esta ubicacion del dispatch es con el fin de animar el boton (que se desactive cuando esta trayendo la informacion. )
        dispatch(finishLoading())
      }).catch((err) => {
        console.log(err);
        // Esta ubicacion del dispatch es con el fin de animar el boton (que se desactive cuando esta trayendo la informacion. )
        dispatch(finishLoading())
        Swal.fire('Error', err.message, 'error' );
      });

      // dispatch(finishLoading())
    }  
}

// TAREA ASINCRONA
export const startGoogleLogin= () => {
  // Este dispatch lo provee el thunk (middelware)
  return (dispatch) => {
    // Este codigo retorna una promesa 
    firebase.auth().signInWithPopup(googleAuthProvider)
      // Conociendo que es lo que retorna la peticion, puedo desestructurar directamente sobre la respuesta
      .then(({user}) => {
        dispatch(login(user.uid, user.displayName))
      }).catch((err) => {
      console.log(err);
      });
  }
}


export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload:{
      uid,
      displayName
    }
  }
}

/***LOGOUT */

export const startLogout= () => {
  // Este dispatch lo provee el thunk (middelware)
  return async (dispatch) => {
    // Este codigo retorna una promesa, si retorna la promesa quiere decir que salió correctamente, por  lo general esta instruccion nunca falla. 
    await firebase.auth().signOut();
    
    dispatch(logout());
    dispatch(notesLougout());
      
  }
}

// Esta funcion no se deberia de exportar, pero como estamos en etapa de pruebas es necesario. 
export const logout = () => {
  return {
    type: types.logout,
  }
}



