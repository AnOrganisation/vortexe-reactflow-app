import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Commands from "./Commands";
import { Button } from "@nextui-org/react";

/**
 * CommandBar component renders a UI element that allows users to interact with a list of commands.
 * It includes a search input, buttons to toggle between "Commands" and "Workflows", and a list of command buttons.
 *
 * @returns {JSX.Element} The rendered CommandBar component.
 */
const CommandBar = () => {
  const initialCommands = [
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
  ];
  const [commands, setCommands] = useState(initialCommands);
  // State to track which button is active, default is 'Commands'
  const [activeButton, setActiveButton] = useState("Commands");

  /**
   * Handles button clicks to set the active button state.
   *
   * @param {string} buttonName - The name of the button that was clicked.
   */
  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="absolute z-20 w-48 max-h-screen text-white rounded-lg shadow-lg cursor-pointer bg-[#1F1F1F] left-5 top-28 flex flex-col items-center border border-[#6366F1]">
      <input
        type="text"
        className="w-[148px] h-[14px] p-2 mb-4 text-white border-none rounded-full outline-none mt-5 bg-[#6366F1] bg-opacity-40"
        placeholder="Search"
      />
      <div className="flex flex-row items-center w-full ml-6">
        <Button
          className={`mr-2 text-white focus:outline-none h-4 w-14 text-xxs text-center rounded-sm ${
            activeButton === "Commands" ? "bg-[#6366F1]" : "bg-[#757575]"
          }`}
          onClick={() => handleClick("Commands")}
        >
          Actions
        </Button>
        <Button
          className={`text-white focus:outline-none h-4 w-14 text-xxs text-center rounded-sm ${
            activeButton === "Workflows" ? "bg-[#6366F1]" : "bg-[#757575]"
          }`}
          onClick={() => handleClick("Workflows")}
        >
          Workflows
        </Button>
      </div>
      <div className="border border-[#6366F1] rounded-lg w-[90%] mb-5 flex flex-col">
        <Button className="w-[155px] h-[27px] p-2 text-white bg-[#6366F1] text-sm ml-2 rounded-full mb-10 mt-3 focus:outline-none">
          <div className="relative flex items-center justify-center">
            <p className="absolute">Custom Action +</p>
          </div>
        </Button>
        <div className="mb-3 space-y-2 overflow-y-auto max-h-96 custom-scrollbar">
          {commands.map((command, index) => (
            <Commands key={index} command={command} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandBar;
