/*
  {
    notes:[],
    active: null (esto es si no tiene ninguna nota seleccionada),
    active: {
      id: uid firebase,
      title: '',
      body: '',
      imageURL:'',
      date: date
    }
  }
*/


import { types } from "../types/types";

const initialState= {
  notes:[],
  active: null,
}

const notesReducer = (state=initialState, action) => {

  switch (action.type) {
    
    case types.notesActive:
      return{
        // Clonamos el estado anterior, para siempre regresar un nuevo estado, no mutar el estado anterior.
        ...state,
        active:{
          ...action.payload
        }
      } 
    
    case types.notesAddNew:
      return{
        ...state,
        // Agrego la nueva nota, y la concateno con las notas anteriores
        notes:[action.payload, ...state.notes]
      } 
  
    case types.notesLoad:
      // Aca hubo un error con la carga de las notas, en vez de recibir un arreglo recibia una promesa, se solucionó poniendo 'await' en la función que recibe las notas de la base de datos. 
      // console.log(action.payload);
      return{ 
        ...state,
        notes:[...action.payload]
      } 


    case types.notesUpdated:
      return{
        ...state, 
        notes: state.notes.map(
          note => note.id===action.payload.id
          ? action.payload.note
          :note
        )
      }


    case types.notesDelete:
      return{
        ...state,
        // Limpiamos el estado.
        active:null,
        // Con esta instruccion, retornamos todas las notas que no coincidan con el id que eliminamos
        notes:state.notes.filter(note => note.id !== action.payload)
      }

    case types.notesLogoutCleaning:
      return{
        ...state,
        // Limpiamos el estado.
        active:null,
        // Limpiamos las notas
        // Cagada mia, no lo puedo definir como null porque luego cuando cargue por primera vez de nuevo (cuadno realice el login) y tenga que mostrar las notas a la derecha, yo hago un map para cargar cada componente, entonces cuando se cargue el compoenente por primra vez y haga un map  de null, sacarra error de que 'cannot read property 'map' of null', por eso se tiene que definir cmo un arreglo vacio en vez de null.
        // notes:null
        notes:[],
      }


    default:
      return state;
  }
}

export default notesReducer
