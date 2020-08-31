import React, { useEffect, useRef } from 'react'
import NotesAppBar from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDelete } from '../../actions/notes'

const NoteScreen = () => {

  const dispatch = useDispatch();
  const {active:note} = useSelector(state => state.notes)

  // MUCHO CUIDADO, cuando retorno un array como lo es en este caso, si lo quiero destructurar debe ser con las llaves de un array, no de un objeto.
  // Hay un problema y es que cuando hago click sobre una de las entradas (journalEntry), la pantalla que muestra la entrada en detalle (NoteScreen), no se actualiza. El estado en Redux cambia pero la pantalla no, esto se debe a que useForm maneja su propio estado.
  //Aunque la nota cambie, esta no va a volver a ejecutar la nota de mi useForm. 
  const [formValues,handleInputChange,reset]= useForm(note);
  const {body, title}=formValues;

  // Me permite almacenar una variable mutable que no va a redibujar todo el componente si cambia. Lo que va  hacer esta referencia es comparar el ID de la nota activa (en general seria la nota que le di click primero) con el ID de la nota a la que despues le di click. Como mencionaba antes, al dar click en otra nota, el estado en redux se actualiza, pero no lo hace en el useForm ya que el hook no se vuelve a ejecutar, por lo que el active ID no cambia. 
  const activeID = useRef(note.id);
  
  useEffect(() => {
    // OJO, el current es para obtener el valor actual.
    if (activeID.current !==note.id) {
      reset(note);
      activeID.current=note.id;
    }  
  }, [note,reset])

  useEffect(() => {
    
    dispatch(activeNote(formValues.id, {...formValues}))
  }, [formValues,dispatch])

  const handleDelete = () => {
    dispatch(startDelete(activeID));
  }
  



  return (
    <div className="note__main-content">
      <NotesAppBar/>

      <div className="notes__content">
        <input
          autoComplete="off"
          type="text"
          placeholder="some awesome"
          className="notes__title-input"
          name='title'
          value={title}
          onChange={handleInputChange}
        />
        
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name='body'
          value={body}
          onChange={handleInputChange}
        />

        {
          note.url &&
          (<div className="notes__image">
            <img
              src={note.url}
              alt="imagen"/>
            </div>)
        }
      </div>

      <button 
        className= "btn btn-danger"
        onClick={handleDelete}
      >
        Delete
      </button>



    </div>
  )
}

export default NoteScreen
