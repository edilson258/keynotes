import { BiSave } from "react-icons/bi";
import { FormEvent, useRef, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import { getUserNote } from "../../services/firebaseService";
import INote from "../../interfaces/INote";
import { getSession } from "next-auth/react";

const UpdateNote = ({ note }: { note: INote }) => {
  const router = useRouter();

  const [isUpdatingNote, setIsUpdatingNote] = useState(false);

  const noteTitleRef = useRef<HTMLInputElement>(null);
  const noteDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const noteCategoryRef = useRef<HTMLSelectElement>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsUpdatingNote(true);

    const noteTitle = noteTitleRef.current?.value;
    const noteDescription = noteDescriptionRef.current?.value;
    const noteCategory = noteCategoryRef.current?.value;

    if (!noteTitle || !noteDescription || !noteCategory) {
      throw new Error("Provide note data");
    }

    fetch("/api/notes/updatenote", {
      method: "PATCH",
      body: JSON.stringify({
        id: note.id,
        title: noteTitle,
        description: noteDescription,
        category: noteCategory,
      }),
    })
      .then(() => null)
      .catch(() => {
        throw new Error("Failed to Update note");
      })
      .finally(() => {
        setIsUpdatingNote(false);
        router.push("/");
      });
  };

  return (
    <div className="container py-8 px-4 mx-auto max-h-vh">
      <h1 className="text-slate-700 font-bold text-4xl text-center">
        edit <span className="text-sky-500">Note</span>
      </h1>
      <form className="mt-8" onSubmit={(e) => handleFormSubmit(e)}>
        <label
          className="block mb-2 text-lg text-slate-500 font-bold text-md font-bold"
          htmlFor="title"
        >
          Title
        </label>

        <input
          defaultValue={note.title}
          ref={noteTitleRef}
          required
          minLength={5}
          placeholder="Aa"
          className="focus:shadow-outline-lg focus:border-none focus:outline-sky-500 shadow font-semibold text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-loose mb-6"
          id="title"
        />

        <label
          className="block mb-2 text-lg text-slate-500 font-bold text-md font-bold"
          htmlFor="description"
        >
          Description (optional)
        </label>

        <textarea
          ref={noteDescriptionRef}
          id="description"
          placeholder="Aa"
          className="focus:shadow-outline-lg focus:border-none focus:outline-sky-500  shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-loose"
          rows={5}
        >
          {note.description}
        </textarea>

        <label
          className="block mt-4 mb-2 text-lg text-slate-500 font-bold text-md font-bold"
          htmlFor="category"
        >
          Category
        </label>

        <select
          defaultValue={note.category}
          ref={noteCategoryRef}
          id="category"
          className="focus:outline-2 px-2 text-slate-700 font-bold focus:outline-sky-500 bg-white py-3 border shadow rounded w-full"
        >
          <option value="school">School</option>
          <option value="work">Work</option>
          <option value="life">Life</option>
        </select>

        <button
          type="submit"
          className="disabled:opacity-50 flex justify-center gap-4 items-center text-white w-full bg-sky-500 rounded py-2 text-lg font-bold mt-8"
          disabled={isUpdatingNote ? true : false}
        >
          {isUpdatingNote ? (
            <>
              updating...
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.5"
                width="20"
                visible={true}
              />
            </>
          ) : (
            <>
              Update
              <BiSave />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/users/login",
        permanent: false,
      },
    };
  }

  const noteid = context.query.noteid?.toString();

  if (!noteid) throw new Error("Provide a note ID");

  const note = await getUserNote(noteid);

  return {
    props: {
      note,
    },
  };
};

export { getServerSideProps };

export default UpdateNote;
