import React, { useState, useEffect } from "react";
import Command from "./action/Command";
import Workflow from "./workflow/Workflow";
import { Button } from "@nextui-org/react";
import CustomWorkflowBtn from "./workflow/CustomWorkflowBtn";
import CustomActionBtn from "./action/CustomActionBtn";

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

  const initialWorkflows = [
    "Workflow 1",
    "Workflow 2",
    "Workflow 3",
    "Workflow 4",
    "Workflow 5",
    "Workflow 6",
    "Workflow 7",
    "Workflow 8",
    "Workflow 9",
    "Workflow 10",
    "Workflow 11",
    "Workflow 12",
    "Workflow 13",
    "Workflow 14",
    "Workflow 15",
  ];

  const [workflows, setWorkflows] = useState(initialWorkflows);
  // State to store the filtered commands
  const [commands, setCommands] = useState(initialCommands);
  // State to track which button is active, default is 'Commands'
  const [activeButton, setActiveButton] = useState("Commands");
  // State to track the search query
  const [searchQuery, setSearchQuery] = useState("");

  //State to track the custom actions
  const [customActions, setCustomActions] = useState([]);

  useEffect(() => {
    if (customActions.length !== 0) {
      customActions.map((customAction) => {
        setCommands((prevCommands) => [...prevCommands, customAction]);
      });
    }
  }, [customActions]);

  useEffect(() => {
    // Filter commands based on the search query
    if (searchQuery === "") {
      if (activeButton === "Commands") {
        setCommands([...initialCommands, ...customActions]);
      } else {
        setWorkflows(initialWorkflows);
      }
    } else {
      if (activeButton === "Commands") {
        const filteredCommands = [...initialCommands, ...customActions].filter(
          (command) => command.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCommands(filteredCommands);
      } else {
        const filteredWorkflows = initialWorkflows.filter((workflow) =>
          workflow.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setWorkflows(filteredWorkflows);
      }
    }
  }, [searchQuery, activeButton, customActions]);

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
        className="w-[148px] h-[14px] p-2 mb-4 text-white border-none rounded-full outline-none mt-5 bg-[#6366F1] bg-opacity-40 text-xs"
        placeholder={
          activeButton === "Commands" ? "Search an action" : "Search a workflow"
        }
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
        {activeButton === "Commands" ? (
          <CustomActionBtn setCustomAction={setCustomActions} />
        ) : (
          <CustomWorkflowBtn />
        )}
        <div className="mb-3 space-y-2 overflow-y-auto max-h-96 custom-scrollbar">
          {activeButton === "Commands"
            ? commands.map((command, index) => (
                <Command key={index} command={command} />
              ))
            : workflows.map((workflow, index) => (
                <Workflow key={index} workflow={workflow} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default CommandBar;
