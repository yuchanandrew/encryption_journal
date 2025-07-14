import axios from "axios";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

interface EmotionDisplayProps {
  id: number;
}

const EmotionDisplay = ({ id }: EmotionDisplayProps) => {
  const [emotion, setEmotion] = useState("");
  const [color, setColor] = useState("");
  const [emoji, setEmoji] = useState("");

  const fetchEmotion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/get-emotion/${id}`
      );

      const retrievedEmotion = response.data.emotion;

      setEmotion(retrievedEmotion);
    } catch (error) {
      console.error(
        "Something went wrong while emotion was being retrieved:",
        error
      );
    }
  };

  useEffect(() => {
    fetchEmotion();
  }, [id]);

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
      className={`${color} text-sm hover:underline shadow py-2 px-4 rounded-3xl`}
    >
      <Link to={`/collection/emotions/${emotion}`}>
        #{emotion} {emoji}
      </Link>
    </div>
  );
};

export default EmotionDisplay;
