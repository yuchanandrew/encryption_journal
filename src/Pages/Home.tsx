import React, { useContext } from "react";
import EmotionalScoring from "../Components/EmotionalScoring";
import EmotionalColoring from "../Components/EmotionalColoring";
import EmotionalColoringCollective from "../Components/EmotionalColoringCollective";
import EmotionalScoringCollective from "../Components/EmotionalScoringCollective";
import HeroPage from "./HeroPage";
import AuthContext from "../Components/Context/AuthProvider";

const Home = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("AuthContext must be used within AuthProvider.");
  }

  const { user } = auth;

  return user === null ? (
    <HeroPage />
  ) : (
    <div className="outer-page-div">
      <h2 className="flex page-heading">Welcome Home 👽</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
        <EmotionalColoring children={<EmotionalScoring />} />
        <div className="flex shadow heading bg-blue-gray rounded py-4 px-8">
          Share your Mood
        </div>
      </div>
      <div className="flex flex-col bg-gray-300 py-10 justify-center items-center space-y-6 w-full">
        <h2 className="heading">Feelings today as a collective 🫂</h2>
        <div className="w-1/2">
          <EmotionalColoringCollective
            children={<EmotionalScoringCollective />}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
