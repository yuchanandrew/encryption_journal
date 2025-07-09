import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { IoPersonCircle } from "react-icons/io5";
import { useState } from "react";
import ProfilePop from "./ProfilePop";

const Navigation = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div className="relative bg-matcha py-4 shadow-lg">
      <div className="flex flex-wrap gap-8 justify-center items-center">
        {" "}
        <Link to="/" className="heading">
          Home
        </Link>
        <button className="heading hover-primary rounded-xl p-4 bg-chinese-violet">
          <LuPlus />
        </button>
        <Link to="/collection" className="heading">
          Collection
        </Link>
      </div>
      <div className="absolute right-5 top-5 z-50">
        <button onClick={handleClick} className="hover-primary">
          <IoPersonCircle size={50} />
        </button>
        {click && <ProfilePop />}
      </div>
    </div>
  );
};

export default Navigation;
