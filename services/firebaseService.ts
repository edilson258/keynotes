import INote from "../interfaces/INote";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
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

export async function saveNewUserNote(note: INote) {
  try {
    const docRef = await addDoc(collection(db, "notes"), {
      title: note.title,
      description: note.description,
      category: note.category,
    });
    return docRef.id;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to save new note to firebase");
  }
}

export async function deleteUserNote(noteID: string) {
  const noteRef = doc(db, "notes", noteID);
  return deleteDoc(noteRef)
    .then(() => true)
    .catch(() => {
      throw new Error("Failed to delete note");
    });
}
