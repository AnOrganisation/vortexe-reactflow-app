import React from "react";

const Commands = ({ command }) => {
  return (
    <button className="w-[140px] h-[27px] p-2 bg-white text-black rounded-full focus:outline-none ml-3 hover:bg-[#6366F1] hover:text-white">
      <div className="relative flex items-center justify-center">
        <p className="absolute">{command}</p>
      </div>
    </button>
  );
};

export default Commands;
