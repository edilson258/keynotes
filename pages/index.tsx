import Head from "next/head";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { MdEdit } from "react-icons/md";

function NoteCard() {
  return (
    <div className="text-slate-600 relative shadow p-4 pt-8 pb-1 rounded">
      <p className="absolute text-white font-bold bg-slate-700 px-1 top-0 left-0 rounded-tl rounded-br">
        1
      </p>
      <h1 className="font-semibold text-2xl">Note Title</h1>
      <p className="opacity-80">This is just the body of the note</p>
      <div className="text-xl border-t my-2 py-2 flex gap-2">
        <button className="px-3 border rounded text-red-500 border-red-500">
          <BiTrashAlt />
        </button>
        <button className="flex justify-center gap-1.5 items-center px-3 border rounded text-white bg-sky-400 border-sky-400">
          Edit
          <MdEdit />
        </button>
      </div>
    </div>
  );
}

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>My Notes</title>
      </Head>

      <main className="container relative mx-auto py-8 text-slate-700 max-h-vh">
        <h1 className="text-center text-4xl font-bold">Key Notes</h1>

        <div
          className="fixed bottom-16 right-4 bg-sky-500 p-4 rounded-full shadow-lg shadow-sky-500/50 z-10"
          onClick={() => router.push("/addnote")}
        >
          <AiOutlinePlus className="text-2xl text-white" />
        </div>

        <div className="sm:container py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4">
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
      </main>
    </>
  );
};

export default Home;
