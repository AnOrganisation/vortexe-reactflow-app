import React from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Command = ({
  userID,
  actionID,
  actionName,
  prompt,
  actionType,
  description,
  modelConfiguration,
  isActivatedFromCustomWorkflowModal,
  nodes,
  setNodes,
  setEdges,
  onNodesDelete,
  activeFileContent,
  activeNodeID,
  fileNodes,
  setFileNodes,
  setFileEdges,
  setAlert,
  setAlertMessage,
  setAlertType,
  onCommandSelected,
}) => {
  const runCommand = async () => {
    try {
      const response = await axios.post(
        "https://api.vortexeai.com:8001/custom",
        {
          content: activeFileContent,
          summary_length: 0,
          prompt: prompt,
        }
      );
      console.log("Success:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  // const handlePress = async () => {
  //   if (isActivatedFromCustomWorkflowModal) {
  //     console.log(
  //       `Adding command: ${actionName} with uid: ${actionID} with prompt: ${prompt}`
  //     );

  //     // Find the last node of the same type
  //     const lastNode = nodes
  //       .filter((node) => node.type === "ActionNode")
  //       .slice(-1)[0];

  //     // Calculate the new y-position for the new node based on the last node's position
  //     const newYPosition = lastNode ? lastNode.position.y + 60 : 0;

  //     // Define the new node
  //     const newActionNode = {
  //       id: uuidv4(), // Generate a unique id
  //       type: "ActionNode", // Type of node
  //       data: {
  //         label: `${actionName}`,
  //         //value: prompt,
  //         onNodesDelete: onNodesDelete,
  //       },
  //       position: { x: 100, y: newYPosition },
  //     };

  //     // Define the new edge, if there is a last node of the same type
  //     const newEdge = lastNode
  //       ? {
  //           id: uuidv4(), // Generate a unique id for the edge
  //           source: lastNode.id,
  //           target: newActionNode.id,
  //         }
  //       : null;

  //     // Add the new node to the nodes array
  //     setNodes((nds) => [...nds, newActionNode]);

  //     // Add the new edge to the edges array if it exists
  //     if (newEdge) {
  //       setEdges((eds) => [...eds, newEdge]);
  //     }
  //   } else {
  //     /**
  //      * *Creation of the output node to display the result of the command when triggered*
  //      */

  //     //find the node that the command was ran on by id
  //     const triggerNode = fileNodes.find((node) => node.id === activeNodeID);

  //     if (!(triggerNode && triggerNode.type === "FileNode")) {
  //       setAlertMessage("Command can only be executed on a File");
  //       setAlertType("danger");
  //       setAlert(true);
  //     } else {
  //       console.log(
  //         `Executing command: ${actionName} with uid: ${actionID} with prompt: ${prompt}`
  //       );
  //       const result = await runCommand();
  //       const newOutputNode = {
  //         id: uuidv4(),
  //         type: "OutputNode",
  //         data: {
  //           value: result.summary,
  //           label: actionName,
  //           source: "command",
  //         },
  //         position: {
  //           x: triggerNode.position.x + 100,
  //           y: triggerNode.position.y,
  //         },
  //       };
  //       const newFileEdge = {
  //         id: `${triggerNode.id}-${newOutputNode.id}`,
  //         source: triggerNode.id,
  //         target: newOutputNode.id,
  //       };
  //       setFileNodes((nds) => [...nds, newOutputNode]);
  //       setFileEdges((eds) => [...eds, newFileEdge]);
  //     }
  //   }
  // };
  const handlePress = () => {
    if (onCommandSelected) {
      // Node addition mode
      const commandData = {
        user_id: userID,
        action_id: actionID,
        action_name: actionName,
        prompt,
        action_type: actionType,
        description,
        model_configuration: modelConfiguration,
      };
      console.log(
        `Selected command: ${actionName} with id: ${actionID} prompt: ${prompt.instruction} actionType: ${actionType} description: ${description} modelConfiguration: ${modelConfiguration} Sending to parent component...  `
      );
      onCommandSelected(commandData);
    }
  };

  return (
    <div onClick={handlePress}>
      <p>{actionName}</p>
    </div>
  );
};

export default Command;
