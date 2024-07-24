import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Commands from "./Commands";
import MyButton from "./MyButton";

const CommandBar = () => {
  return (
    <div className="absolute z-20 w-48 max-h-screen text-white rounded-lg shadow-lg cursor-pointer bg-[#1F1F1F] left-5 top-28 flex flex-col items-center border border-[#6366F1]">
      <input
        type="text"
        className="w-[148px] h-[14px] p-2 mb-4 text-white border-none rounded-full outline-none ml-5 mt-5"
        placeholder="Search"
      />
      <div className="flex flex-row items-center justify-between w-full mb-4 ml-4">
        <button className="flex-1 p-2 mr-2 bg-gray-800 rounded-lg focus:outline-none">
          Commands
        </button>
        <button className="flex-1 p-2 bg-gray-800 rounded-lg focus:outline-none">
          Workflows
        </button>
      </div>
      <div className="border border-[#6366F1] rounded-lg w-[90%] mb-5 flex flex-col">
        <button className="w-[155px] h-[27px] p-2 text-white bg-[#6366F1] text-sm ml-2 rounded-full mb-10 mt-3">
          <div className="relative flex items-center justify-center">
            <p className="absolute">Custom Command +</p>
          </div>
        </button>
        <div className="space-y-2 overflow-y-auto max-h-96">
          {[
            "Simplify",
            "Summarize",
            "Email",
            "Transcribe",
            "Video",
            "Analyze",
            "Textify",
            "Itinerary",
            "Analytics",
            "Customer Exp",
            "Vocalize",
            "FAQ",
            "Inspiration",
            "Grammar",
            "Randomize",
            "Translate",
            "Fix Format",
            "Add Refs",
          ].map((command, index) => (
            <Commands key={index} command={command} /> // Pass `command` prop correctly
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandBar;
