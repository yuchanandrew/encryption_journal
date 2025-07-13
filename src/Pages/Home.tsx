import React from "react";

const Home = () => {
  return (
    <div className="outer-page-div">
      <h2 className="flex page-heading">Welcome Home 👽</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex heading bg-blue-gray rounded py-4 px-8">
          Emotions of the Day
        </div>
        <div className="flex heading bg-blue-gray rounded py-4 px-8">
          Share your Mood
        </div>
      </div>
    </div>
  );
};

export default Home;
