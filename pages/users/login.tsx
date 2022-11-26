import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";

const AddNote = () => {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="select-none container py-8 px-4 mx-auto max-h-vh">
      <h1 className="text-slate-700 font-bold text-4xl text-center">Sign In</h1>
      <form className="mt-8" onSubmit={(e) => handleFormSubmit(e)}>
        <label
          className="block mb-2 text-lg text-slate-500 font-bold text-md font-bold"
          htmlFor="username"
        >
          Username
        </label>

        <input
          ref={usernameRef}
          required
          minLength={8}
          placeholder="Aa"
          className="focus:shadow-outline-lg focus:border-none focus:outline-sky-500 shadow font-semibold text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-loose mb-6"
          id="username"
        />

        <label
          className="block mb-2 text-lg text-slate-500 font-bold text-md font-bold"
          htmlFor="password"
        >
          Password
        </label>

        <input
          ref={passwordRef}
          type="password"
          required
          minLength={8}
          placeholder="*******"
          className="focus:shadow-outline-lg focus:border-none focus:outline-sky-500 shadow font-semibold text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-loose mb-6"
          id="password"
        />

        <button
          type="submit"
          className="shadow shadow-lg shadow-sky-500/50 text-white w-full bg-sky-500 rounded py-2 text-lg font-bold mt-8"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 border-t">
        <div
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="shadow py-2 select-none cursor-pointer mt-4 text-xl flex justify-center items-center gap-4 rounded"
        >
          <FcGoogle />
          Signin with Google
        </div>

        <div
          className="shadow py-2 select-none cursor-pointer mt-4 text-xl flex justify-center items-center gap-4 rounded"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <BsGithub />
          Signin with Github
        </div>
      </div>
    </div>
  );
};

export default AddNote;
