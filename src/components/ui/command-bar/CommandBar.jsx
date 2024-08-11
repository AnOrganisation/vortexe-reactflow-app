import React, { useState, useEffect } from "react";
import Command from "./action/Command";
import Workflow from "./workflow/Workflow";
import { Button } from "@nextui-org/react";
import CustomWorkflowBtn from "./workflow/CustomWorkflowBtn";
import CustomActionBtn from "./action/CustomActionBtn";
import { v4 as uuidv4 } from "uuid";

/**
 * CommandBar component renders a UI element that allows users to interact with a list of commands.
 * It includes a search input, buttons to toggle between "Commands" and "Workflows", and a list of command buttons.
 *
 * @returns {JSX.Element} The rendered CommandBar component.
 */
const CommandBar = ({
  activeFileContent,
  activeNodeID,
  fileNodes,
  setFileNodes,
  setFileEdges,
  setAlert,
  setAlertMessage,
  setAlertType,
}) => {
  const initialCommands = new Map([
    ["Simplify", "Simplify the text"],
    ["Summarize", "Summarize the content"],
    ["Email", "Compose an email"],
    ["Transcribe", "Transcribe the audio"],
    ["Video", "Process the video"],
    ["Analyze", "Analyze the data"],
    ["Textify", "Convert to text"],
    ["Itinerary", "Create an itinerary"],
    ["Analytics", "Generate analytics"],
    ["Customer Exp", "Improve customer experience"],
    ["Vocalize", "Convert text to speech"],
    ["FAQ", "Generate FAQs"],
    ["Inspiration", "Provide inspiration"],
    ["Grammar", "Check grammar"],
    ["Randomize", "Randomize the order"],
    ["Translate", "Translate the text"],
    ["Fix Format", "Fix the format"],
    ["Add Refs", "Add references"],
  ]);

  const initialWorkflows = new Map([
    ["Workflow 1", ["Simplify", "Summarize"]],
    ["Workflow 2", ["Task 1", "Task 2"]],
    ["Workflow 3", ["Task 1", "Task 2"]],
    ["Workflow 4", ["Task 1", "Task 2"]],
    ["Workflow 5", ["Task 1", "Task 2"]],
    ["Workflow 6", ["Task 1", "Task 2"]],
    ["Workflow 7", ["Task 1", "Task 2"]],
    ["Workflow 8", ["Task 1", "Task 2"]],
    ["Workflow 9", ["Task 1", "Task 2"]],
    ["Workflow 10", ["Task 1", "Task 2"]],
    ["Workflow 11", ["Task 1", "Task 2"]],
    ["Workflow 12", ["Task 1", "Task 2"]],
    ["Workflow 13", ["Task 1", "Task 2"]],
    ["Workflow 14", ["Task 1", "Task 2"]],
    ["Workflow 15", ["Task 1", "Task 2"]],
  ]);

  const [workflows, setWorkflows] = useState(initialWorkflows);
  // State to store the filtered commands
  const [commands, setCommands] = useState(initialCommands);
  // State to track which button is active, default is 'Commands'
  const [activeButton, setActiveButton] = useState("Commands");
  // State to track the search query
  const [searchQuery, setSearchQuery] = useState("");

  // State to track the custom actions
  const [customActions, setCustomActions] = useState(new Map());

  // State to track the custom workflows
  const [customWorkflows, setCustomWorkflows] = useState(new Map());

  useEffect(() => {
    if (customActions.size !== 0) {
      setCommands((prevCommands) => {
        const newCommands = new Map(prevCommands);
        customActions.forEach((value, key) => {
          newCommands.set(key, value);
        });
        return newCommands;
      });
    }
  }, [customActions]);

  useEffect(() => {
    if (customWorkflows.size !== 0) {
      setWorkflows((prevWorkflows) => {
        const newWorkflows = new Map(prevWorkflows);
        customWorkflows.forEach((value, key) => {
          newWorkflows.set(key, value);
        });
        return newWorkflows;
      });
    }
  }, [customWorkflows]);

  useEffect(() => {
    // Filter commands based on the search query
    if (searchQuery === "") {
      if (activeButton === "Commands") {
        setCommands(new Map([...initialCommands, ...customActions]));
      } else {
        setWorkflows(new Map([...initialWorkflows, ...customWorkflows]));
      }
    } else {
      if (activeButton === "Commands") {
        const filteredCommands = new Map(
          [...initialCommands, ...customActions].filter(([key, value]) =>
            key.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setCommands(filteredCommands);
      } else {
        const filteredWorkflows = new Map(
          [...initialWorkflows, ...customWorkflows].filter(([key, value]) =>
            key.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setWorkflows(filteredWorkflows);
      }
    }
  }, [searchQuery, activeButton, customActions, customWorkflows]);

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
          <CustomWorkflowBtn
            setCustomWorkflow={setCustomWorkflows}
            commands={commands}
          />
        )}
        <div className="mb-3 space-y-2 overflow-y-auto max-h-96 custom-scrollbar">
          {activeButton === "Commands"
            ? Array.from(commands).map(([key, value], index) => (
                <Command
                  key={index}
                  commandName={key}
                  prompt={value}
                  commandID={`commandBar-` + uuidv4()}
                  activeFileContent={activeFileContent}
                  activeNodeID={activeNodeID}
                  fileNodes={fileNodes}
                  setFileNodes={setFileNodes}
                  setFileEdges={setFileEdges}
                  setAlert={setAlert}
                  setAlertMessage={setAlertMessage}
                  setAlertType={setAlertType}
                />
              ))
            : Array.from(workflows).map(([key, value], index) => (
                <Workflow
                  key={index}
                  workflowName={key}
                  workflowID={uuidv4()}
                  actionList={value}
                  commands={commands}
                  fileNodes={fileNodes}
                  setFileNodes={setFileNodes}
                  setFileEdges={setFileEdges}
                  activeFileContent={activeFileContent}
                  activeNodeID={activeNodeID}
                  setAlert={setAlert}
                  setAlertMessage={setAlertMessage}
                  setAlertType={setAlertType}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default CommandBar;
