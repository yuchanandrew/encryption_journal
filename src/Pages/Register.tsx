import axios from "axios";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");

      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        username: username,
        email: emailAddress,
        plain_pw: password,
      });

      console.log("Registered user's username:", response.data.user.username);

      setUsername("");
      setEmailAddress("");
      setPassword("");
      setConfirmPassword("");

      navigate("/sign-in");
    } catch (error) {
      console.error("Something went wrong while registering user.", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-12 mb-20 space-y-6">
      <h2 className="flex page-heading">Register</h2>
      <div className="w-full max-w-lg bg-gray-200 rounded">
        <form onSubmit={handleRegister} className="p-4">
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="input-field"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username..."
              required
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              id="confirm_password"
              className="input-field"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter password again..."
              required
            />
          </div>
          <div className="flex justify-center">
            <button className="flex hover-primary mt-8 font-semibold shadow-xl bg-green-300 border-2 border-green-400 w-1/2 rounded-xl py-4 justify-center items-center">
              Register
            </button>
          </div>
          <div className="flex border-2 border-gray-300 rounded-xl mt-12"></div>
          <div className="flex mt-4">
            <p>Already have an account with us?</p>
          </div>
          <div className="flex mb-4 mt-2">
            <Link
              to="/sign-in"
              className="text-sky-400 underline hover:text-sky-500"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
