import INote from "../interfaces/INote";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { firebaseApp } from "../firebase/config";

const db = getFirestore(firebaseApp);

export async function getUserNote(noteID: string) {
  try {
    const noteRef = doc(db, "notes", noteID);
    const docSnap = await getDoc(noteRef);
    const note: INote = {
      id: noteID,
      title: docSnap.get("title"),
      description: docSnap.get("description"),
      category: docSnap.get("category"),
    };
    return note;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get user note");
  }
}

export async function getAllUserNotes() {
  try {
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
  } catch (err) {
    console.error(err);
    throw new Error("Failed to load user notes from firebase");
  }
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

export async function updateUserNote(note: INote) {
  if (!note.id) return null;
  const noteRef = doc(db, "notes", note.id);

  const noteData = {
    title: note.title,
    description: note.description,
    category: note.category,
  };
  return setDoc(noteRef, noteData)
    .then(() => true)
    .catch(() => {
      throw new Error("Failed to update note");
    });
}

export async function deleteUserNote(noteID: string) {
  const noteRef = doc(db, "notes", noteID);
  return deleteDoc(noteRef)
    .then(() => true)
    .catch(() => {
      throw new Error("Failed to delete note");
    });
}
