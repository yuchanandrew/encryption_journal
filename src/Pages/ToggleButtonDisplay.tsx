import { useState } from "react";

const ToggleButtonDisplay = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center">
        <div className="flex md:justify-self-end sm:ml-12">
          {toggle ? (
            <div className="h-7" />
          ) : (
            <h2 className="flex heading text-center">
              Keep your emotions private
            </h2>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setToggle(!toggle)}
            className={`toggle-btn-display ${toggle ? "toggled" : ""}`}
          >
            <div className="big-thumb"></div>
          </button>
        </div>
        <div className="flex md:justify-self-start sm:mr-12">
          {toggle ? (
            <h2 className="flex heading text-center">
              Share them to the world
            </h2>
          ) : (
            <div className="h-7" />
          )}
        </div>
      </div>
      {!toggle ? (
        <div className="flex flex-col justify-center items-center mt-12 max-w-7/10 bg-gray-300 rounded-xl py-8 px-4 space-y-6 shadow-xl animate-popping">
          <h2 className="flex text-2xl">Staying private</h2>
          <div className="flex border-2 border-gray-400 rounded-xl w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
            <div className="flex justify-center items-center">
              <p className="flex text-md text-left text-gray-600 mt-4 px-4">
                This app is a journaling first and foremost. We provide a secure
                place to keep a journal that is structured, safe, and fun to
                interact with.
                <br />
                <br />
                This functionality was created with those in mind who want more
                consistency in journaling. The convenient, yet data-protected
                environment is a way for you to experiment, interact, and
                understand your emotions.
              </p>
            </div>
            <div className="flex text-9xl items-center justify-center">🔒</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-12 max-w-7/10 bg-gray-300 rounded-xl py-8 px-4 space-y-6 shadow-xl animate-popping">
          <h2 className="flex text-2xl">Going live</h2>
          <div className="flex border-2 border-gray-400 rounded-xl w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
            <div className="flex justify-center items-center">
              <p className="flex text-md text-left text-gray-600 mt-4 px-4">
                If you decide to go public about your emotions and the stories
                behind them, we offer a feature to interact with other users and
                see how everyone else is feeling all while providing an optional
                level of anonimity.
                <br />
                <br />
                This functionality offers you the ability to share your feelings
                to the world and the complex stories that go behind them. Being
                human is something that we have not even come close to
                understanding completely. By reading others' stories and the
                emotions they feel, we hope that you and other users can feel a
                sense of understanding and community in such a disconnected
                world.
              </p>
            </div>
            <div className="flex text-9xl items-center justify-center">🫂</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToggleButtonDisplay;
