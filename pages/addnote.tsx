import { BiSave } from "react-icons/bi";

const AddNote = () => {
  return (
    <div className="container py-8 px-4 mx-auto max-h-vh">
      <h1 className="text-slate-700 font-bold text-4xl text-center">
        add new <span className="text-sky-500">Note</span>
      </h1>
      <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
        <label
          className="block mb-2 text-lg text-slate-500 font-bold text-md font-bold"
          htmlFor="title"
        >
          Title
        </label>

        <input
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
          id="description"
          placeholder="Aa"
          className="focus:shadow-outline-lg focus:border-none focus:outline-sky-500  shadow text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-loose"
          rows={5}
        ></textarea>

        <button
          type="submit"
          className="flex justify-center gap-2 items-center text-white w-full bg-sky-500 rounded py-2 text-lg font-bold mt-8"
        >
          Save
          <BiSave />
        </button>
      </form>
    </div>
  );
};

export default AddNote;
