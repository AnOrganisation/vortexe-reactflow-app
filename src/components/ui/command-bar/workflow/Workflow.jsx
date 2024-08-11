// Workflow.jsx
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
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
  const getPrompts = () => {
    const newPrompts = [];
    actionList.forEach((action) => {
      Array.from(commands).forEach(([key, value]) => {
        if (key === action) {
          newPrompts.push(value);
        }
      });
    });
    return newPrompts; // Return the prompts array directly
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
      return null;
    }
  };

  const handlePress = async () => {
    // Find the node that the command was ran on by id
    const triggerNode = fileNodes.find((node) => node.id === activeNodeID);
    if (!(triggerNode && triggerNode.type === "FileNode")) {
      setAlertMessage("Workflow can only be executed on a File");
      setAlertType("danger");
      setAlert(true);
      return;
    }

    console.log(`Executing workflow: ${workflowName} with id: ${workflowID}`);
    actionList.forEach((action) => {
      console.log(` with action: ${action}`);
      Array.from(commands).forEach(
        ([key, value]) =>
          key === action ? console.log(`  with prompt: ${value}`) : null // only log prompt if action matches command key
      );
    });

    const prompts = getPrompts(); // Get prompts for each command in the workflow

    const result = await runWorkflow(prompts); // Run the workflow with the correct prompts and get the final result

    console.log("Workflow Result in handlePress:", result);
    /**
     * *Creation of the output node to display the result of the workflow when triggered*
     */

    if (triggerNode && triggerNode.type === "FileNode") {
      const newOutputNode = {
        id: uuidv4(),
        type: "OutputNode",
        data: {
          value: result,
          label: workflowName,
          source: "workflow",
        },
        position: {
          x: triggerNode.position.x + 100,
          y: triggerNode.position.y,
        },
      };

      const newFileEdge = {
        id: `${triggerNode.id}-${newOutputNode.id}`,
        source: triggerNode.id,
        target: newOutputNode.id,
        type: "custom", // Use the CustomEdge
        data: { label: `${workflowName}`, commands: actionList }, // Pass the label text
        style: { stroke: "#6366F1" },
      };

      setFileNodes((nds) => [...nds, newOutputNode]);
      setFileEdges((eds) => [...eds, newFileEdge]);
    }
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
