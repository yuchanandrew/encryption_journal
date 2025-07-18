import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { IoPersonCircle } from "react-icons/io5";
import { useContext, useState } from "react";
import ProfilePop from "./ProfilePop";
import AuthContext from "./Context/AuthProvider";
import axios from "axios";
import SignOutComponent from "./SignOutComponent";

const Navigation = () => {
  const [click, setClick] = useState(false);

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  // TODO: Add auth-dependent layout.

  const { user } = auth;

  const handleClick = () => {
    setClick(!click);
  };
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
          <div className="flex flex-row items-center bg-gray-200 px-3 gap-4 rounded-3xl">
            <h2>Welcome, {user.username}.</h2>
            <button onClick={handleClick} className="hover-primary">
              <IoPersonCircle size={50} />
            </button>
            {/* TODO: Re-format ProfilePop.tsx... */}
            {/* {click && <ProfilePop />} */}
            <SignOutComponent />
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
