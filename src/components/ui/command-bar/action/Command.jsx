import React from "react";
import { Button } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const Command = ({
  commandName,
  prompt,
  isActivatedFromCustomWorkflowModal,
  nodes,
  setNodes,
  setEdges,
  onNodesDelete,
  commandID,
  activeFileContent,
}) => {
  const runCommand = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8001/custom", {
        content: activeFileContent,
        summary_length: 0,
        prompt: prompt,
      });
      console.log("Success:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = () => {
    if (isActivatedFromCustomWorkflowModal) {
      console.log(
        `Adding command: ${commandName} with uid: ${commandID} with prompt: ${prompt}`
      );

      // Find the last node of the same type
      const lastNode = nodes
        .filter((node) => node.type === "ActionNode")
        .slice(-1)[0];

      // Calculate the new y-position for the new node based on the last node's position
      const newYPosition = lastNode ? lastNode.position.y + 60 : 0;

      // Define the new node
      const newActionNode = {
        id: uuidv4(), // Generate a unique id
        type: "ActionNode", // Type of node
        data: {
          label: `${commandName}`,
          //value: prompt,
          onNodesDelete: onNodesDelete,
        },
        position: { x: 100, y: newYPosition },
      };

      // Define the new edge, if there is a last node of the same type
      const newEdge = lastNode
        ? {
            id: uuidv4(), // Generate a unique id for the edge
            source: lastNode.id,
            target: newActionNode.id,
          }
        : null;

      // Add the new node to the nodes array
      setNodes((nds) => [...nds, newActionNode]);

      // Add the new edge to the edges array if it exists
      if (newEdge) {
        setEdges((eds) => [...eds, newEdge]);
      }
    } else {
      console.log(
        `Executing command: ${commandName} with uid: ${commandID} with prompt: ${prompt}`
      );
      runCommand();
    }
  };
  return (
    <Button
      onPress={handlePress}
      radius="full"
      className="w-[140px] h-[27px] p-2 bg-white text-black focus:outline-none ml-3 hover:bg-[#6366F1] hover:text-white text-sm"
    >
      <div className="relative flex items-center justify-center">
        <p className="absolute">{commandName}</p>
      </div>
    </Button>
  );
};

export default Command;
