import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { IoPersonCircle } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "./Context/AuthProvider";
import SignOutComponent from "./SignOutComponent";

const Navigation = () => {
  const dropdown = useRef<HTMLDivElement>(null);
  const profile = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  // TODO: Add auth-dependent layout.

  const { user } = auth;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!open && profile.current?.contains(e.target as Node)) {
        setOpen(true);
      } else if (
        open &&
        dropdown.current &&
        !dropdown.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  return (
    <div className="relative bg-matcha py-4 shadow-lg">
      <div className="flex flex-wrap gap-8 justify-center items-center">
        <Link to="/" className="heading">
          Home
        </Link>
        <Link
          to="/create-post"
          className="heading hover-primary shadow rounded-xl p-4 bg-indigo-300"
        >
          <LuPlus />
        </Link>
        <Link to="/collection" className="heading">
          Collection
        </Link>
      </div>
      <div className="absolute right-5 top-5 z-50 items-center">
        {user ? (
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row items-center bg-gray-200 px-3 gap-4 rounded-3xl">
              <h2>Welcome, {user.username}.</h2>
              <button ref={profile} className="hover-primary">
                <IoPersonCircle size={50} />
              </button>
              {/* TODO: Re-format ProfilePop.tsx... */}
            </div>
            {open && (
              <div
                ref={dropdown}
                className="relative shadow-xl flex flex-col justify-between items-center space-y-4 bg-gray-300 rounded-xl w-full py-6 px-2 right-0 h-auto z-50"
              >
                <Link to="/profile" className="flex">
                  Profile
                </Link>
                <SignOutComponent />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2 items-center justify-center rounded-2xl">
            <Link
              to="/register"
              className="hover:underline hover:bg-gray-300 bg-gray-200 rounded-xl p-3 shadow"
            >
              Register
            </Link>
            <Link
              to="/sign-in"
              className="hover:underline hover:bg-sky-400 bg-sky-300 rounded-xl p-3 shadow"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
