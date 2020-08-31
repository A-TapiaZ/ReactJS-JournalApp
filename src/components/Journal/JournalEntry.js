import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';
const JournalEntry = ({id,date,title,body,url}) => {
  
  const dispatch = useDispatch();

  // Con la libreria momentJS puedo convertir la hora que esta en la base de datos y extraer los datos que necesite respecto a las fechas y horas.
  const noteDate = moment(date)

  const handleClick= () => {
    dispatch(activeNote(id,{title, body, date, url} ));
  }

  return (
    <div 
      className="journal__entry pointer animate__animated animate__fadeIn animate__faster" 
      onClick={handleClick}
    >

    {
      url?
        <div 
          className="journal__entry-picture"
          style={{
            backgroundSize:'cover',
            backgroundImage:`url(${url})`
          }}
        ></div>
     :
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize:'cover',
            backgroundImage:`url(https://earthsky.org/upl/2018/12/comet-wirtanen-Jack-Fusco-dec-2018-Anza-Borrego-desert-CA-e1544613895713.jpg)`
          }}
        ></div>
    }
     
      <div className="journal__entry-body">
        
        <p className="journal__entry-title"
        >{title}</p>
        
        <p className="journal__entry-content"
        >{body}</p>
      
      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>




    </div>
  )
}


export default JournalEntry
