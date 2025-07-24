import React, { useState } from "react";

const Test = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="flex flex-col outer-page-div">
      <h2 className="flex page-heading">Button</h2>
      <button
        onClick={() => setToggle(!toggle)}
        className={`toggle-btn ${toggle ? "toggled" : ""}`}
      >
        <div className="thumb"></div>
      </button>
    </div>
  );
};

export default Test;
