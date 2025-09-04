import axios from "axios";
import { useEffect, useState } from "react";

const base_url = "api";

const EmotionalScoringCollective = () => {
  const emotionScore: Record<string, number> = {
    anger: -1,
    annoyance: -1,
    disgust: -1,
    fear: -1,
    nervousness: -1,
    embarrassment: -1,
    sadness: -1,
    grief: -1,
    disappointment: -1,
    remorse: -1,
    confusion: -1,
    joy: 1,
    excitement: 1,
    gratitude: 1,
    pride: 1,
    love: 1,
    caring: 1,
    optimism: 1,
    relief: 1,
    admiration: 1,
    approval: 1,
    amusement: 1,
    curiosity: 1,
    realization: 1,
    surprise: 1,
    desire: 1,
    neutral: 0,
  };

  const dayCheck = (score: number) => {
    if (score < -3) {
      return "Mostly a bad day. 🙁";
    } else if (score >= -3 && score <= 3) {
      return "What a neutral day. 😗";
    } else if (score > 3) {
      return "You're having a good day! 😌";
    }
  };

  const [totalScore, setTotalScore] = useState(0);

  const now = new Date();
  const nowToTimestamp = new Intl.DateTimeFormat("en-CA").format(now);
  // const nowToTimestamp = now.toISOString().slice(0, 10);

  // console.log("User from auth:", user?.id);

  const fetchDayEmotions = async () => {
    try {
      const response = await axios.get(
        `${base_url}/emotions-of-the-day-collective`,
        {
          params: {
            day: nowToTimestamp,
          },
        }
      );

      const retrievedEmotions = response.data.emotions;

      //   console.log("Retrieved:", retrievedEmotions);

      const emotionScoresArray = retrievedEmotions.map(
        (emotionScoresItem: { emotion: string }) =>
          emotionScore[emotionScoresItem.emotion]
      );

      //   console.log(emotionScoresArray);

      const compiledScore = emotionScoresArray.reduce(
        (acc: number, currentValue: number) => acc + currentValue,
        0
      );

      setTotalScore(compiledScore);
    } catch (error) {
      console.error("Error while retrieving emotions of the day", error);
    }
  };

  useEffect(() => {
    fetchDayEmotions();
  }, [nowToTimestamp]);

  return (
    <div className="flex flex-col emotion-analysis-heading">
      {dayCheck(totalScore)}
    </div>
  );
};

export default EmotionalScoringCollective;
