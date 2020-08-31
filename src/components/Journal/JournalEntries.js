import React from 'react'
import JournalEntry from './JournalEntry';
import { useSelector } from 'react-redux';

const JournalEntries = () => {

  const {notes} = useSelector(state => state.notes)
  
  return (
    <div className="journal__entries">
      {
        notes.map(note => (
          <JournalEntry 
          key={note.id}
          // esto se entiende como, mandar todas las propiedades como props
          {...note}
          />
        ))
      }
    </div>
  )
}

export default JournalEntries
