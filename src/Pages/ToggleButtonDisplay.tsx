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
        <div className="flex flex-col justify-center items-center mt-12">
          <h2 className="flex text-2xl">Staying private</h2>
          <p className="flex text-sm text-center text-gray-600 mt-4 px-4 md:w-7/10">
            This app is a journaling first and foremost. We provide a secure
            place to keep a journal that is structured, safe, and fun to
            interact with.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-12">
          <h2 className="flex text-2xl">Going live</h2>
          <p className="flex text-sm text-center text-gray-600 mt-4 px-4 md:w-7/10">
            If you decide to go public about your emotions and the stories
            behind them, we offer a feature to interact with other users and see
            how everyone else is feeling all while providing an optional level
            of anonimity.
          </p>
        </div>
      )}
    </div>
  );
};

export default ToggleButtonDisplay;
