import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // TODO: Complete handleLogin
  };
  return (
    <div className="flex flex-col justify-center items-center py-6 space-y-6">
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
            <button className="flex hover-primary mt-4 font-semibold bg-matcha w-1/2 rounded py-4 justify-center items-center">
              Register
            </button>
          </div>
          <div className="flex justify-center py-3 mt-4">
            <p>- Or register through -</p>
          </div>
          <div className="flex justify-center mt-4 mb-4">
            <FaGoogle size={25} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
