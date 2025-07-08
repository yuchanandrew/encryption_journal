import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col py-6 justify-center items-center space-y-12">
      <h2 className="flex page-heading text-center">
        Where your best-kept secrets are kept hidden.
      </h2>
      <form className="flex-col justify-center items-center space-y-6 w-10/12">
        <label htmlFor="entry" className="flex text-center justify-center">
          What secret do you have for today?
        </label>
        <input
          className="flex border-1 rounded focus:outline focus:shadow-xl w-full h-auto bg-white"
          id="entry"
        />
      </form>
    </div>
  );
};

export default Home;
