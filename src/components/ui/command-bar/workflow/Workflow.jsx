import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";

const Workflow = ({
  workflowName,
  actionList,
  commands,
  workflowID,
  activeFileContent,
  activeNodeID,
  fileNodes,
  setFileNodes,
  setFileEdges,
  setAlert,
  setAlertMessage,
  setAlertType,
}) => {
  const [prompts, setPrompts] = useState([]);
  const [isRunning, setIsRunning] = useState(false); // Track if workflow should run

  const getPrompts = () => {
    const newPrompts = [];
    actionList.forEach((action) => {
      Array.from(commands).forEach(([key, value]) => {
        if (key === action) {
          newPrompts.push(value);
        }
      });
    });
    setPrompts(newPrompts);
  };

  const runWorkflow = async (prompts) => {
    try {
      let content = activeFileContent; // Start with the initial content

      for (const prompt of prompts) {
        const response = await axios.post("http://127.0.0.1:8001/custom", {
          content: content,
          summary_length: 0,
          prompt: prompt,
        });

        console.log("Success:", response.data);

        // Set the content for the next API call
        content = response.data.summary;
      }

      return content; // Final content after all prompts are processed
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  };

  useEffect(() => {
    if (isRunning) {
      runWorkflow(prompts).then(() => {
        setIsRunning(false);
      });
    }
  }, [prompts, isRunning]);

  const handlePress = () => {
    console.log(`Executing workflow: ${workflowName} with id: ${workflowID}`);
    actionList.forEach((action) => {
      console.log(` with action: ${action}`);
      Array.from(commands).forEach(
        ([key, value]) =>
          key === action ? console.log(`  with prompt: ${value}`) : null // only log prompt if action matches command key
      );
    });

    getPrompts(); // Get prompts for each command in the workflow
    setIsRunning(true); // Trigger the workflow to run
  };

  return (
    <Button
      onPress={handlePress}
      radius="full"
      className="w-[140px] h-[27px] p-2 bg-white text-black focus:outline-none ml-3 hover:bg-[#6366F1] hover:text-white text-sm"
    >
      <div className="relative flex items-center justify-center">
        <p className="absolute">{workflowName}</p>
      </div>
    </Button>
  );
};

export default Workflow;
