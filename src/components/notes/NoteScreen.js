import React from 'react'
import NotesAppBar from './NotesAppBar'

const NoteScreen = () => {
  return (
    <div className="note__main-content">
      <NotesAppBar/>

      <div className="notes__content">
        <input
          autoComplete="off"
          type="text"
          placeholder="some awesome"
          className="notes__title-input"
        />
        
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
        />

        <div className="notes__image">
          <img
            src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
            alt="imagen"/>
        </div>
        
      </div>

    </div>
  )
}

export default NoteScreen
