import axios from "axios";
import { useEffect, useState } from "react";

const EmotionalColoring = ({ children }: any) => {
  const [names, setNames] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const redColor = "var(--color-red-300)";
  const blueColor = "var(--color-blue-300)";
  const greenColor = "var(--color-emerald-300)";
  const purpleColor = "var(--color-purple-300)";
  const grayColor = "var(--color-gray-200)";

  const colorDict: Record<string, string> = {
    anger: redColor,
    annoyance: redColor,
    disgust: redColor,
    fear: redColor,
    nervousness: redColor,
    embarrassment: redColor,
    sadness: blueColor,
    grief: blueColor,
    disappointment: blueColor,
    remorse: blueColor,
    confusion: blueColor,
    joy: greenColor,
    excitement: greenColor,
    gratitude: greenColor,
    pride: greenColor,
    love: greenColor,
    caring: greenColor,
    optimism: greenColor,
    relief: greenColor,
    admiration: greenColor,
    approval: greenColor,
    amusement: greenColor,
    curiosity: purpleColor,
    realization: purpleColor,
    surprise: purpleColor,
    desire: purpleColor,
    neutral: grayColor,
  };

  const now = new Date();
  const nowToTimestamp = now.toISOString().slice(0, 10);

  const gradientStyle = {
    background: `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
  };

  const fetchTopEmotions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/top-emotions-of-the-day",
        {
          params: {
            day: nowToTimestamp,
          },
        }
      );

      const emotions = response.data.emotions;

      const namesArray = emotions.map(
        (emotion: { emotion: string }) => emotion.emotion
      );

      setNames(namesArray);

      const colorArray = emotions.map(
        (emotion: { emotion: string }) => colorDict[emotion.emotion]
      );

      setColors(colorArray);
    } catch (error) {
      console.error("Error occurred while retrieving top emotions.", error);
    }
  };

  useEffect(() => {
    fetchTopEmotions();
  }, []);

  return (
    <div
      style={gradientStyle}
      className="flex flex-col bg-blue-gray rounded w-full px-4 py-8 justify-center items-center space-y-6"
    >
      <h2 className="flex heading">Emotions of the Day</h2>
      {children}
      <h2>Your top emotions:</h2>
      <ul className="list-disc list-inside">
        <li>{names[0]}</li>
        <li>{names[1]}</li>
        <li>{names[2]}</li>
      </ul>
    </div>
  );
};

export default EmotionalColoring;
