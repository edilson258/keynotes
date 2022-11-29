import { BiNotepad } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="shadow">
      <div className="sm:container mx-auto py-3.5 px-4 flex items-center justify-between">
        <div className="flex gap-2 items-center text-2xl font-bold text-sky-500">
          <BiNotepad />
          Key Notes
        </div>

        <div>
          <ul className="flex gap-4 items-center font-semibold text-md">
            <li
              onClick={() => signOut({ callbackUrl: "/users/login" })}
              className="cursor-pointer select-none py-1 px-2 hover:text-red-500 hover:scale-110 easy-in-out duration-200"
            >
              Logout
            </li>
            <li className="cursor-pointer select-none py-1 px-2 hover:text-sky-500 hover:scale-110 easy-in-out duration-200">
              <img
                className="object-fill w-8 h-8 rounded-full"
                src={session.data?.user?.image?.toString()}
              ></img>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
