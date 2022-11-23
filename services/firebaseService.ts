import INote from "../interfaces/INote";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseApp } from "../firebase/config";

const db = getFirestore(firebaseApp);

export async function getAllUserNotes() {
  const notes: INote[] = [];

  const querySnapshot = await getDocs(collection(db, "notes"));
  for (let note of querySnapshot.docs) {
    const newnote: INote = {
      id: note.id,
      title: note.get("title"),
      description: note.get("description"),
      category: note.get("category"),
    };
    notes.push(newnote);
  }

  return notes;
}
