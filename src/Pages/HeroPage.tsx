import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButtonDisplay from "./ToggleButtonDisplay";
import axios from "axios";
import PostHero from "../Components/PostHero";

type PostType = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_url: string;
  post_date: string;
  post_time: string;
};

const HeroPage = () => {
  const navigate = useNavigate();

  // const blueColor = "var(--color-blue-300)";
  // const skyColor = "var(--color-sky-300)";
  // const purpleColor = "var(--color-purple-300)";

  // const gradientStyle = {
  //   background: `linear-gradient(to right, ${purpleColor}, ${blueColor}, ${skyColor})`,
  // };

  const [cards, setCards] = useState<PostType[]>([]);

  const fetchCards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get-posts");

      setCards(response.data.posts);
    } catch (error) {
      console.error("Something went wrong while fetching posts.", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="flex flex-col flex-1 hero-page-div justify-center">
      {/* Hero Section! */}
      <div className="flex w-full bg-green-300 justify-center py-12 shadow-md sm:min-h-[50vh] md:min-h-[50vh] lg:min-h-[75vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 px-8 w-8/12 justify-items-center">
          <div className="flex flex-col space-y-6 justify-center">
            <h2 className="flex text-5xl">Emotion Analyzing and Sharing.</h2>
            <p className="flex">
              Secure privacy, shareable content, emotion analyzing AI tool all
              in one.
            </p>
          </div>
          <div className="flex justify-center items-center">
            {/* Add an animation here with CSS maybe (smileys change and background changes to match the expression) */}
            <h2 className="flex text-9xl">😀</h2>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="hover-primary sign-up-button lg:max-h-[8vh] md:max-h-[6vh]"
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-center items-center sm:min-h-[50vh] md:min-h-[50vh] lg:min-h-[75vh] w-full">
        <h2 className="flex text-2xl mt-12">Sounds good to you?</h2>
        <p className="flex text-lg text-gray-600 mt-2 mb-4">
          It's as easy as...
        </p>
        <div className="flex w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full px-4">
            <div className="hero-steps-outer-div bg-purple-200 border-1 border-gray-400">
              <div
                style={{
                  background:
                    "linear-gradient(45deg, var(--color-purple-300), var(--color-purple-500))",
                }}
                className="hero-number-bg"
              >
                <h2 className="hero-number">01</h2>
              </div>
              <div className="grid grid-cols-2 w-3/4 mt-12 items-center ml-8">
                <p className="flex justify-self-center text-xl">
                  Creating your account
                </p>
                <h2 className="flex text-6xl justify-self-center">😗</h2>
              </div>
            </div>
            <div className="hero-steps-outer-div bg-blue-200 border-1 border-gray-400">
              <div
                style={{
                  background:
                    "linear-gradient(45deg, var(--color-blue-300), var(--color-blue-500))",
                }}
                className="hero-number-bg"
              >
                <h2 className="hero-number">02</h2>
              </div>
              <div className="grid grid-cols-2 w-3/4 mt-12 items-center ml-8">
                <p className="flex justify-self-center text-xl">
                  Creating your first post
                </p>
                <h2 className="flex text-6xl justify-self-center">🙂</h2>
              </div>
            </div>
            <div className="hero-steps-outer-div bg-green-200 border-1 border-gray-400">
              <div
                style={{
                  background:
                    "linear-gradient(45deg, var(--color-green-300), var(--color-green-500))",
                }}
                className="hero-number-bg"
              >
                <h2 className="hero-number">03</h2>
              </div>
              <div className="grid grid-cols-2 w-3/4 mt-12 items-center ml-8">
                <p className="flex justify-self-center text-xl">
                  Letting our AI analyze your mood with ease
                </p>
                <h2 className="flex text-6xl justify-self-center">🙂‍↔️</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Feature Section */}
      <div className="flex flex-col w-full sm:min-h-[50vh] md:min-h-[50vh] lg:min-h-[75vh] items-center">
        <h2 className="flex text-2xl mt-12 text-center">
          With just a press of a button
        </h2>
        <p className="flex text-lg text-gray-600 mt-2 mb-12">
          You can decide to...
        </p>
        <ToggleButtonDisplay />
      </div>

      {/* User Posts Display Section */}
      <div className="flex flex-col w-full items-center bg-green-300 sm:min-h-[50vh] md:min-h-[50vh] lg:min-h-[75vh] py-12">
        <h2 className="flex text-2xl text-center">
          See what others have posted
        </h2>
        <div className="overflow-x-hidden [mask-image:_linear-gradient(to_right,_transparent_0,_black_5vw,_calc(100%-5vw),_transparent_100%)] max-w-full">
          <div className="inline-flex animate-infinite-scroll whitespace-nowrap py-4 mt-8">
            {cards.slice(0, 7).map((card: PostType) => (
              <div key={card.id} className="px-2">
                <PostHero
                  id={card.id}
                  title={card.title}
                  user_id={card.user_id}
                  content={card.content}
                  image_url={card.image_url}
                />
              </div>
            ))}
            {cards.slice(0, 7).map((card: PostType) => (
              <div key={card.id} className="px-2">
                <PostHero
                  id={card.id}
                  title={card.title}
                  user_id={card.user_id}
                  content={card.content}
                  image_url={card.image_url}
                />
              </div>
            ))}
          </div>
        </div>
        <h2 className="flex text-2xl mt-12 text-center">
          Want to see some more?
        </h2>
        <button
          onClick={() => navigate("/collection")}
          className="hover-primary border-1 border-sky-400 mt-8 py-3 px-12 rounded-xl bg-sky-300"
        >
          Collection
        </button>
      </div>
    </div>
  );
};

export default HeroPage;
