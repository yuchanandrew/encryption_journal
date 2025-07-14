import React from "react";
import EmotionalScoring from "../Components/EmotionalScoring";
import EmotionalColoring from "../Components/EmotionalColoring";

const Home = () => {
  return (
    <div className="outer-page-div">
      <h2 className="flex page-heading">Welcome Home 👽</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
        <EmotionalColoring children={<EmotionalScoring />} />
        <div className="flex shadow heading bg-blue-gray rounded py-4 px-8">
          Share your Mood
        </div>
      </div>
    </div>
  );
};

export default Home;
