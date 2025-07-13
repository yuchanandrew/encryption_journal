import axios from "axios";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

interface EmotionAnalyzerProps {
  id: number;
  content: string;
}

const EmotionAnalyzer = ({ id, content }: EmotionAnalyzerProps) => {
  const [emotion, setEmotion] = useState("");
  const [color, setColor] = useState("");
  const [emoji, setEmoji] = useState("");

  const analyzeEmotion = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/emotion", {
        text: content,
      });

      const data = response.data;
      //   console.log(`Here is the output of ${id}:`, data);

      setEmotion(data.js_emotion.emotion);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  useEffect(() => {
    analyzeEmotion();
    // console.log("Here is emotions:", emotions);
  }, []);

  // Since emotions are generated after user submits, emotions have to be added into database after as well
  // SOLUTION: Simply create an update query to add the emotion into designated emotion attribute in table
  const updateEmotions = async () => {
    try {
      const response = await axios.post("http://localhost:3000/add-emotion", {
        emotion: emotion,
        id: id,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error("There was an error in updating emotions", error);
    }
  };

  // Renders the update whenever emotion attribute is changed
  useEffect(() => {
    updateEmotions();
  }, [emotion]);

  const redEmotions = [
    "anger",
    "annoyance",
    "disgust",
    "fear",
    "nervousness",
    "embarrassment",
  ];
  const blueEmotions = [
    "sadness",
    "grief",
    "disappointment",
    "remorse",
    "confusion",
  ];
  const greenEmotions = [
    "joy",
    "excitement",
    "gratitude",
    "pride",
    "love",
    "caring",
    "optimism",
    "relief",
    "admiration",
    "approval",
    "amusement",
  ];

  const purpleEmotions = ["curiosity", "realization", "surprise", "desire"];
  const grayEmotions = ["neutral"];

  useEffect(() => {
    if (redEmotions.includes(emotion)) {
      setColor("bg-red-300");
      setEmoji("😠");
    } else if (blueEmotions.includes(emotion)) {
      setColor("bg-blue-300");
      setEmoji("🙁");
    } else if (greenEmotions.includes(emotion)) {
      setColor("bg-emerald-300");
      setEmoji("🙂");
    } else if (purpleEmotions.includes(emotion)) {
      setColor("bg-purple-300");
      setEmoji("🙂‍↔️");
    } else if (grayEmotions.includes(emotion)) {
      setColor("bg-gray-200");
      setEmoji("😐");
    }
  }, [emotion]);

  return (
    <div
      className={`${color} emotion-analysis-heading hover-primary hover:underline shadow py-2 px-4 rounded`}
    >
      <Link to={`/collection/${emotion}`}>
        #{emotion} {emoji}
      </Link>
    </div>
  );
};

export default EmotionAnalyzer;
