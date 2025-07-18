import React, { useContext } from "react";
import AuthContext from "./Context/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignOutComponent = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  const { logout } = auth;

  const handleLogout = async () => {
    await axios.post("http://localhost:3000/sign-out");

    logout();

    navigate("/sign-out-confirmation");
  };

  return (
    <button onClick={handleLogout} className="p-2 bg-sky-300">
      Sign Out!
    </button>
  );
};

export default SignOutComponent;
