import axios from "axios";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

interface EmotionAnalyzerProps {
  id: number;
  content: string;
}

const EmotionAnalyzer = ({ id, content }: EmotionAnalyzerProps) => {
  const [emotions, setEmotions] = useState("");
  const [color, setColor] = useState("");
  const [emoji, setEmoji] = useState("");

  const analyzeEmotion = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/emotion", {
        text: content,
      });

      const data = response.data;
      console.log(`Here is the output of ${id}:`, data);

      setEmotions(data.js_emotion.emotion);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  useEffect(() => {
    analyzeEmotion();
    console.log("Here is emotions:", emotions);
  }, []);

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
  ];
  const purpleEmotions = ["curiosity", "realization", "surprise", "desire"];
  const grayEmotions = ["neutral"];

  useEffect(() => {
    if (redEmotions.includes(emotions)) {
      setColor("bg-red-300");
      setEmoji("😠");
    } else if (blueEmotions.includes(emotions)) {
      setColor("bg-blue-300");
      setEmoji("🙁");
    } else if (greenEmotions.includes(emotions)) {
      setColor("bg-emerald-300");
      setEmoji("🙂");
    } else if (purpleEmotions.includes(emotions)) {
      setColor("bg-purple-300");
      setEmoji("🙂‍↔️");
    } else if (grayEmotions.includes(emotions)) {
      setColor("bg-gray-200");
      setEmoji("😐");
    }
  }, [emotions]);

  return (
    <div
      className={`${color} emotion-analysis-heading hover-primary shadow py-2 px-4 rounded`}
    >
      <Link to={`/emotions/${emotions}`}>
        #{emotions} {emoji}
      </Link>
    </div>
  );
};

export default EmotionAnalyzer;
