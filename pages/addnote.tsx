import { BiSave } from "react-icons/bi";
import { FormEvent, useRef, useState } from "react";
import INote from "../interfaces/INote";
import { saveNewUserNote } from "../services/firebaseService";
import { RotatingLines } from "react-loader-spinner";
import { useRouter } from "next/router";

const AddNote = () => {
  const router = useRouter();

  const [isSavingNote, setIsSavingNote] = useState(false);

  const noteTitleRef = useRef<HTMLInputElement>(null);
  const noteDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const noteCategoryRef = useRef<HTMLSelectElement>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSavingNote(true);

    const noteTitle = noteTitleRef.current?.value;
    const noteDescription = noteDescriptionRef.current?.value;
    const noteCategory = noteCategoryRef.current?.value;

    if (!noteTitle || !noteDescription || !noteCategory) return;

    const note: INote = {
      title: noteTitle,
      description: noteDescription,
      category: noteCategory,
    };

    await saveNewUserNote(note);
    setIsSavingNote(false);

    router.push("/");
  };

  return (
    <div className="container py-8 px-4 mx-auto max-h-vh">
      <h1 className="text-slate-700 font-bold text-4xl text-center">
        add new <span className="text-sky-500">Note</span>
      </h1>
      <form className="mt-8" onSubmit={(e) => handleFormSubmit(e)}>
        <label
          className="block mb-2 text-lg text-slate-500 font-bold text-md font-bold"
          htmlFor="title"
        >
          Title
        </label>

        <input
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
        ></textarea>

        <label
          className="block mt-4 mb-2 text-lg text-slate-500 font-bold text-md font-bold"
          htmlFor="category"
        >
          Category
        </label>

        <select
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
          disabled={isSavingNote ? true : false}
        >
          {isSavingNote ? (
            <>
              Saving...
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
              Save
              <BiSave />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddNote;
