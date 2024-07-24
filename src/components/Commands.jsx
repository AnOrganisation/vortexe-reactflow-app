import React from "react";

const Commands = (index, command) => {
  return (
    <button
      key={index}
      className="w-[140px] h-[27px] p-2 bg-white text-black rounded-full focus:outline-none ml-3 mb-3"
    >
      <div className="relative flex items-center justify-center">
        <p className="absolute">{command}</p>
      </div>
    </button>
  );
};

export default Commands;
