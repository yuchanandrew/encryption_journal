import axios from "axios";
import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Components/Context/AuthProvider";

const SignIn = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  const { user, login } = auth;

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/sign-in", {
        email: emailAddress,
        plain_pw: password,
      });

      login(response.data.access);

      console.log("User:", user);

      setEmailAddress("");
      setPassword("");

      // TODO: Eventually replace redirect to user's profile.
      navigate("/home");
    } catch (error) {
      console.error("Something went wrong while registering user.", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-12 mb-20 space-y-6">
      <h2 className="flex page-heading">Sign In</h2>
      <div className="w-full max-w-lg bg-gray-200 rounded">
        <form onSubmit={handleRegister} className="p-4">
          <div className="mb-4">
            <label htmlFor="email_address">Email Address</label>
            <input
              id="email_address"
              className="input-field"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Enter your email..."
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              required
            />
          </div>
          <div className="flex justify-center">
            <button className="flex hover-primary mt-8 font-semibold bg-green-300 border-2 border-green-400 w-1/2 rounded-xl shadow-xl py-4 justify-center items-center">
              Sign In
            </button>
          </div>
          <div className="w-full border-2 border-gray-300 rounded-xl mt-12"></div>
          <div className="flex mt-4">
            <p>Don't already have an account with us?</p>
          </div>
          <div className="flex mb-4 mt-2">
            <Link
              to="/register"
              className="underline text-sky-400 hover:text-sky-500"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
