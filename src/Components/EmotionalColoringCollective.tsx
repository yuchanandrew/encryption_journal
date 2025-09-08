import axios from "axios";
import { useEffect, useState } from "react";

const base_url = "api";

const EmotionalColoringCollective = ({ children }: any) => {
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
  const nowToTimestamp = new Intl.DateTimeFormat("en-CA").format(now);

  const gradientStyle = {
    background: `radial-gradient(${colors[0]}, ${colors[1]}, ${colors[2]})`,
  };

  const fetchTopEmotions = async () => {
    try {
      const response = await axios.get(
        `${base_url}/top-emotions-of-the-day-collective`,
        {
          params: {
            day: nowToTimestamp,
          },
        }
      );

      const emotions = response.data.emotions;

      console.log("emotions:", emotions);

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
  }, [nowToTimestamp]);

  return (
    <div
      style={gradientStyle}
      className="flex flex-col bg-indigo-300 border-1 border-gray-600 rounded shadow w-full px-4 py-8 justify-center items-center space-y-6"
    >
      <h2 className="flex heading">Emotions of the Day</h2>
      {children}
      <div className="flex flex-col space-y-6">
        <h2 className="flex">Your top emotions:</h2>
        {names.length !== 0 ? (
          <ul className="list-disc list-inside">
            <li>{names[0]}</li>
            <li>{names[1]}</li>
            <li>{names[2]}</li>
          </ul>
        ) : (
          <p className="flex">You have not posted yet today!</p>
        )}
      </div>
    </div>
  );
};

export default EmotionalColoringCollective;
