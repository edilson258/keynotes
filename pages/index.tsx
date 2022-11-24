import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import INote from "../interfaces/INote";
import { getAllUserNotes } from "../services/firebaseService";
import type { NextRouter } from "next/router";

function NoteCard({
  note,
  handleDeleteNote,
  index,
  router,
}: {
  note: INote;
  handleDeleteNote: (noteID: string) => void;
  index: number;
  router: NextRouter;
}) {
  return (
    <div className="text-slate-600 relative shadow p-4 pt-8 pb-1 rounded">
      <p className="absolute text-white font-bold bg-slate-700 px-1 top-0 left-0 rounded-tl rounded-br">
        {index}
      </p>
      <h1 className="font-semibold text-2xl mb-2">{note.title}</h1>
      <p className="opacity-80">{note.description}</p>
      <div className="text-xl border-t my-2 py-2 flex gap-2">
        <button
          onClick={() => handleDeleteNote(note.id || "")}
          className="px-3 border rounded text-red-500 border-red-500"
        >
          <BiTrashAlt />
        </button>
        <button
          onClick={() => router.push(`/editnote/${note.id}`)}
          className="flex justify-center gap-1.5 items-center px-3 border rounded text-white bg-sky-400 border-sky-400"
        >
          Edit
          <MdEdit />
        </button>
      </div>
    </div>
  );
}

const Home = ({ notes }: { notes: INote[] }) => {
  const [stateNotes, setStateNotes] = useState(notes);
  const router = useRouter();

  async function handleDeleteNote(noteID: string) {
    const newStateNotes = stateNotes.filter((note) => note.id !== noteID);
    setStateNotes(newStateNotes);

    fetch(`/api/notes/deletenote?noteid=${noteID}`, {
      method: "DELETE",
    })
      .then(() => null)
      .catch(() => {
        throw new Error("Failed to delete note");
      });
  }

  return (
    <>
      <Head>
        <title>My Notes</title>
      </Head>

      <main className="container relative mx-auto py-8 text-slate-700 max-h-vh">
        <h1 className="text-center text-4xl font-bold">Key Notes</h1>

        {stateNotes.length >= 1 && (
          <div
            className="fixed bottom-16 right-4 bg-sky-500 p-4 rounded-full shadow-lg shadow-sky-500/50 z-10"
            onClick={() => router.push("/addnote")}
          >
            <AiOutlinePlus className="text-2xl text-white" />
          </div>
        )}

        {stateNotes.length < 1 ? (
          <div className="mt-16  text-center">
            <div className="flex justify-center">
              <FaBoxOpen className="animate-bounce text-6xl" />
            </div>
            <h1 className="mt-2 text-xl">You list of notes is empty</h1>
            <button
              onClick={() => router.push("/addnote")}
              className="mt-8 bg-sky-500 shadow shadow-sky-500/50 px-16 text-white text-lg font-bold mx-4 py-2 rounded"
            >
              Add new Note
            </button>
          </div>
        ) : (
          <div className="sm:container py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4">
            {stateNotes.map((note, index) => (
              <NoteCard
                router={router}
                index={index + 1}
                handleDeleteNote={handleDeleteNote}
                key={note.id}
                note={note}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};

const getServerSideProps = async () => {
  const notes = await getAllUserNotes();
  return {
    props: {
      notes,
    },
  };
};

export { getServerSideProps };

export default Home;
