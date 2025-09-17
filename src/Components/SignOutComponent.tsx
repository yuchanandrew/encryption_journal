import { useContext } from "react";
import AuthContext from "./Context/AuthProvider";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

const SignOutComponent = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  const { logout } = auth;

  const handleLogout = async () => {
    await api.post(`/sign-out`);

    logout();

    navigate("/sign-out-confirmation");
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-red-300 rounded-xl w-full hover:bg-red-400 shadow"
    >
      Sign Out
    </button>
  );
};

export default SignOutComponent;
