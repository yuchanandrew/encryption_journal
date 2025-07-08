import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";

const Navigation = () => {
  return (
    <div className="flex flex-wrap gap-8 bg-matcha justify-center items-center py-6">
      <Link to="/" className="heading">
        Home
      </Link>
      <button className="heading hover-primary rounded-xl p-4 bg-ultra-violet">
        <LuPlus />
      </button>
      <Link to="/collection" className="heading">
        Collection
      </Link>
    </div>
  );
};

export default Navigation;
