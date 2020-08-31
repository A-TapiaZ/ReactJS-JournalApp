import { db } from "../firebase/firebaseConfig"

export const loadNotes = async(uid) => {

  // De esta forma obtengo la coleccion que me interesa traer, en este caso las notas del uid que yo le mando.
  const notesSnap=await db.collection(`${uid}/journal/notes`).get();
  const notes= []

  notesSnap.forEach(snapHijo => {
  
    notes.push({
      id:snapHijo.id,
      ...snapHijo.data()
    });
  });

  
  return notes;
}
