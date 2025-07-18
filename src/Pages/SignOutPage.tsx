import React from "react";
import { Link } from "react-router-dom";

const SignOutPage = () => {
  return (
    <div className="outer-page-div flex flex-col">
      <h2 className="page-heading flex">
        You have been signed-out successfully!
      </h2>
      <Link
        to="/"
        className="flex hover:underline text-sky-300 hover:text-sky-400"
      >
        Back home
      </Link>
    </div>
  );
};

export default SignOutPage;
