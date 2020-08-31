import { db } from "../firebase/firebaseConfig"
import { types } from "../types/types"
import { loadNotes } from "../helpers/loadNotes"
import Swal from "sweetalert2"
import { fileUpload } from "../helpers/fileUpload"


/**TODAS LAS TAREAS ASYNC EMPIEZAN CON START */

/**Accion para agregar una nueva nota a firestore */
export const startNewNote= () => {
  
  // Cuando obtengo el dispatch que me ofrece el thunk, además, este trae consigo un segundo argumento que son los states de la store. 
  return async(dispatch, getState) => {
    
    const {uid} = getState().auth

    // Esto lo mando a un path en especifico en el firestore para grabarlo en la base de datos
    const newNote={
      title:'',
      body: '', 
      date: new Date().getTime(),
    }

    // Implemento la referencia a la base de datos.
    // El add retorna una promesa, que resuelve el document reference
    const docRef= await db.collection(`${uid}/journal/notes`).add(newNote);
    const {id} = docRef;

    dispatch(activeNote(id, newNote))
    dispatch(addNewNote(id, newNote))
  }
  
}

/**Seteamos la nota activa */
// Los parentesis antes de las llaves indican que voy a retornar un objeto directamente, sin tener que realizar otra cosa.
export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id, 
    ...note
  }
})

/**Actulizamos la barra de las notas con la nota nueva */
export const addNewNote = (id,note) => {
  return {
    type:types.notesAddNew,
    payload:{
      id,
      ...note
    }
  }
}


/**Obtengo las notas de cierto usuario desde firebase (con helpers)*/
export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    // El loadNotes es un funcion ubicadad en la carpeta helpers.
    // como se recibe una promesa, se coloca el await para evitar un error
    const notes= await loadNotes(uid);
    dispatch(setNotes(notes));
  }
  
}

/**Establezco el estado con las notas que obtuve en la accion anterior */
export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes, 
})


/**Accion para actualizar en la base de datos*/
export const startSaveNote = (note) => {
  return  async(dispatch, getState)=>{
    
    const {uid} = getState().auth;

    if (!note.url) {
      delete note.url;
    }
    // De acuerdo a como estamos trabajando, el id no es necesario dentro de esta coleccion ya que se encuentra en el documento (un nivel antes).
    const noteToFireStore={...note};
    delete noteToFireStore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);

    // Esta seria la forma peresoza de actualizar el panel de la izquierda cuando modifico y/o actualizo una de las entradas de la aplicacion. Lo que pasa es que cuando actualizo uno de los componentes (journalEntry) las tarjetas de la izquierda no lo hacen por lo que se necesitan refrescar de alguna forma. Como decia antes, esta de esta forma no es conveniente ya que vuelve y carga un monton de informacion que no ha cambiado, por lo que primero no es una buena practica y segundo a la larga consumira mas recursos.

    // dispatch(startLoadingNotes(uid));

    dispatch(refreshNote(note.id, noteToFireStore));
    Swal.fire('saved', note.title, 'success');
  }
}

/**Accion para actualizar la informacion en el panel de la izquierda (Metodo no peresozo)*/

export const refreshNote = (id, note) => ({
  type: types.notesUpdated, 
  payload: {
    id, //el id de la nota
    note:{
      id,
      ...note
    }, // que no deberia llevar el id, pero lo lleva porque si no tendria error con las keys.
  }
})


/** Accion para cargar una imagen a cloudinary y retornar su URL*/
export const startUploading= (file) => {
  
    return async (dispatch, getState) => {
      const {active:activeNote}= getState().notes;

      Swal.fire({
        title:'Uploading',
        text:'Please wait',
        allowOutsideClick:false,
        onBeforeOpen: () => {
          Swal.showLoading();
        }
      })
      const fileURL= await fileUpload(file);
      // Agregamos a la nota activa la direccion de la imagen
      activeNote.url=fileURL;

      /**Diasparamos la accion anterior para actualizar nuestra nota activa con la url  */
      dispatch(startSaveNote(activeNote))
      
      Swal.close();
    }

}

/**Accion para eliminar nota de la BD */


export const startDelete = (id) => {
  return async (dispatch, getState) => {
    
    const uid= getState().auth.uid

    // Es una promesa que retorna vacio, pero si surge un error retornara el error.
    console.log(`${uid}/journal/notes/${id.current}`);
    await db.doc(`${uid}/journal/notes/${id.current}`).delete();

    dispatch(deleteNote(id.current));
  }
  
}

/**Actualizamos el estado en la store, ya sin la nota que se elimino en el paso anterior */
export const deleteNote= (id) => {
  return {
  type: types.notesDelete,
  payload: id,}
}


/**Vamos a purgar el estado de notas cuando el usuario el de a Logout */
export const notesLougout= () => {
  return {
  type: types.notesLogoutCleaning,
  }
}