// App.jsx
import React, { useState, useCallback, useRef, useMemo } from "react";
import { Image, Button } from "@nextui-org/react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

import NumberInput from "./NumberInput.jsx";
import ActionNode from "./components/nodes/ActionNode.jsx";
import FileNode from "./components/nodes/FileNode.jsx";
import OutputNode from "./components/nodes/OutputNode.jsx";
import DefaultInputNode from "./components/nodes/DefaultInputNode.jsx";

import Navbar from "./components/ui/nav/Navbar.jsx";
import CommandBar from "./components/ui/command-bar/CommandBar.jsx";
import Logo from "./assets/VortexeLogo.png";
import Alert from "./components/Alert.jsx";

import "./style.css";
import WorkflowEdge from "./components/edges/WorkflowEdge.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";

// const nodeTypes = {
//   NumberInput,
//   ActionNode,
//   FileNode,
//   OutputNode,
//   DefaultInputNode,
// };

const edgeTypes = {
  custom: WorkflowEdge,
};

const App = () => {
  const nodeColor = (node) => {
    switch (node.type) {
      case "input":
        return "#6ede87";
      case "output":
        return "#6865A5";
      default:
        return "#6366F1";
    }
  };

  // Use useRef for id counter
  const idRef = useRef(1);
  const getId = () => {
    const newId = idRef.current;
    idRef.current += 1;
    return `${newId}`;
  };
  const nodeOrigin = [0.5, 0];

  // State variables...
  const [userID, setUserID] = useState(null);
  const [activeFileContent, setActiveFileContent] = useState(undefined);
  const [activeNodeID, setActiveNodeID] = useState(undefined);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [connection, setConnection] = useState(null);
  const [apiToken, setApiToken] = useState(null);

  // State variables for command bar
  const [showCommandBarForNodeAddition, setShowCommandBarForNodeAddition] =
    useState(false);
  const [newNodeData, setNewNodeData] = useState(null);

  //State variables for workflow
  const [workflowActions, setWorkflowActions] = useState([]);
  const [workflows, setWorkflows] = useState([]);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));

      console.log("onConnect called with params:", params);

      // Update inputData of the target node
      const sourceId = params.source.toString();
      const targetId = params.target.toString();
      updateInputData(sourceId, targetId);
    },
    [setEdges]
  );

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  const onConnectStart = useCallback((event, params) => {
    console.log("onConnectStart", params);
    setConnection({ source: params.nodeId, sourceHandle: params.handleId });
  }, []);

  const updateInputData = (sourceId, targetId) => {
    setNodes((prevNodes) => {
      const sourceNode = prevNodes.find((node) => node.id === sourceId);
      const targetNode = prevNodes.find((node) => node.id === targetId);

      if (sourceNode && targetNode) {
        console.log("Updating inputData of target node");

        return prevNodes.map((node) => {
          if (node.id === targetId) {
            return {
              ...node,
              data: {
                ...node.data,
                inputData: sourceNode.data.outputData,
              },
            };
          }
          return node;
        });
      } else {
        console.log("Source or target node not found");
      }
      return prevNodes;
    });
  };

  const onConnectEnd = useCallback(
    (event) => {
      console.log("onConnectEnd", event);
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane && reactFlowInstance && connection) {
        const flowPosition = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        // Store the screen position
        const screenPosition = {
          x: event.clientX,
          y: event.clientY,
        };

        // Store the data needed to add the node later
        setNewNodeData({
          position: flowPosition,
          screenPosition: screenPosition,
          source: connection.source,
          sourceHandle: connection.sourceHandle,
        });

        // Show the command bar
        setShowCommandBarForNodeAddition(true);
      }

      // Reset the connection state after handling
      setConnection(null);
    },
    [reactFlowInstance, connection]
  );

  const isValidConnection = (connection) => {
    console.log("isValidConnection called with:", connection);
    return true; // Allow all connections
  };

  // Function to handle command selection from the command bar
  const handleCommandSelected = (commandData) => {
    console.log("Command Data in App.jsx:", commandData);
    console.log("Workflow Actions:", workflowActions);
    //Store commandData to be sent to the workflow service for saving
    setWorkflowActions((wfs) => [...wfs, commandData]);

    // Use the stored newNodeData and the commandData to add the node
    const newNodeId = getId();

    const newNode = {
      type: "ActionNode", // or use commandData to determine the type
      id: newNodeId,
      position: newNodeData.position,
      data: {
        label: `${commandData.action_name}`,
        actionID: commandData.action_id,
        inputData: null,
        outputData: null,
        updateDownstreamNodes: updateDownstreamNodes,
      },
      origin: [0.5, 0.0],
    };

    const edgeId = `e-${getId()}`;

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) =>
      eds.concat({
        id: edgeId,
        source: newNodeData.source,
        sourceHandle: newNodeData.sourceHandle,
        target: newNodeId,
        targetHandle: null,
      })
    );

    // Hide the command bar
    setShowCommandBarForNodeAddition(false);

    // Clear the newNodeData
    setNewNodeData(null);
  };

  // Custom keydown handler
  const handleKeyDown = (event) => {
    const targetTagName = event.target.tagName.toLowerCase();
    if (
      event.key === "Backspace" &&
      targetTagName !== "input" &&
      targetTagName !== "textarea"
    ) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const onNodeClick = (event, node) => {
    // Logic for handling node click
    // Determine if the node will be active after this click
    const isActiveAfterClick = !node.data.isNodeActive;

    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isNodeActive: n.id === node.id ? isActiveAfterClick : false,
        },
      }))
    );

    // Set the active content only if the node becomes active after the click
    if (node.type === "FileNode") {
      setActiveFileContent(isActiveAfterClick ? node.data.content : null);
    }

    // Set the activeNodeID based on the new active state
    setActiveNodeID(isActiveAfterClick ? node.id : null);
  };

  const updateDownstreamNodes = useCallback(
    (nodeId, newData) => {
      // Use functional updates to work with the latest state
      setNodes((prevNodes) => {
        const updatedNodes = prevNodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                inputData: newData,
              },
            };
          }
          return node;
        });

        // Find connected edges
        const connectedEdges = edges.filter((edge) => edge.source === nodeId);

        connectedEdges.forEach((edge) => {
          const targetNodeId = edge.target;
          updateDownstreamNodes(targetNodeId, newData);
        });

        return updatedNodes;
      });
    },
    [setNodes, edges] // Keep dependencies minimal
  );

  const nodeTypes = useMemo(() => {
    // Functions and variables used within nodeTypes
    const memoizedSetNodes = setNodes;
    const memoizedUpdateDownstreamNodes = updateDownstreamNodes;

    return {
      ActionNode: (nodeProps) => (
        <ActionNode
          {...nodeProps}
          setNodes={memoizedSetNodes}
          updateDownstreamNodes={memoizedUpdateDownstreamNodes}
        />
      ),
      DefaultInputNode: (nodeProps) => (
        <DefaultInputNode {...nodeProps} setNodes={memoizedSetNodes} />
      ),
      NumberInput,
      FileNode,
      OutputNode,
    };
  }, [setNodes, updateDownstreamNodes]); // Dependencies should not change frequently

  const onUpload = async (fileUrl, formData) => {
    // Logic for handling file upload
    try {
      const response = await axios.post(
        "https://api.vortexeai.com/upload/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File Upload Success:");

      // Generate PDF from the raw content
      const pdfUrl = fileUrl;

      // Find the last node of the same type
      const lastNode = nodes
        .filter((node) => node.type === "FileNode")
        .slice(-1)[0];

      // Calculate the new x-position for the new node based on the last node's position
      const newXPosition = lastNode ? lastNode.position.x + 150 : 0;

      const newNodes = [...nodes];
      const newNode = {
        type: "FileNode",
        id: response.data.file_id,
        position: { x: newXPosition, y: 100 },
        data: {
          label: response.data.filename,
          file: pdfUrl,
          content: response.data.content,
          isNodeActive: false,
        },
      };
      newNodes.push(newNode);
      setNodes(newNodes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleWorkflowSave = async (workflow) => {
    // Logic for handling workflow save to the workflow service
    try {
      const response = await axios.post(
        "https://api.vortexeai.com/workflow/v1/workflows/save",
        workflow
      );
      console.log("Workflow Save Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const getWorkflows = async () => {
    // Logic for fetching workflows from the workflow service
    try {
      const response = await axios.get(
        `https://api.vortexeai.com/workflow/v1/workflows/list?user_id=${userID}`
      );
      console.log("Workflows Fetch Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onAlertClose = () => {
    setAlert(false);
  };

  const handlePress = () => {
    const newNodeId = getId();
    const newNode = {
      type: "DefaultInputNode", // Ensure this matches the key in nodeTypes
      id: newNodeId,
      position: { x: 50, y: 50 },
      data: {
        label: "Input Node",
        outputData: null,
        apiToken: apiToken,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleSave = async () => {
    const currentWorkflow = {
      user_id: userID,
      workflow_name: "My Workflow",
      workflow_id: null,
      workflow_type: "custom",
      actions: workflowActions,
    };
    const workflowSaveResponse = await handleWorkflowSave(currentWorkflow);
    if (workflowSaveResponse != null)
      currentWorkflow.workflow_id = workflowSaveResponse.new_workflow_id;
    setWorkflows([...workflows, currentWorkflow]);
    const listWorkflows = await getWorkflows();
  };

  const defaultEdgeOptions = {
    animated: true,
    style: { stroke: "#006fee" },
  };

  const appContent = (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="relative flex flex-row items-center justify-center w-full">
        <Navbar
          onUpload={onUpload}
          setUserID={setUserID}
          setApiToken={setApiToken}
        />
      </div>
      {showCommandBarForNodeAddition && (
        <CommandBar
          activeFileContent={activeFileContent}
          activeNodeID={activeNodeID}
          fileNodes={nodes}
          setFileNodes={setNodes}
          setFileEdges={setEdges}
          setAlert={setAlert}
          setAlertMessage={setAlertMessage}
          setAlertType={setAlertType}
          userID={userID}
          showForNodeAddition={showCommandBarForNodeAddition}
          onCommandSelected={handleCommandSelected}
          newNodeData={newNodeData}
        />
      )}
      <div className="absolute left-0 z-20 mt-5 ml-4">
        <Image src={Logo} alt="Vortexe Logo" className="w-10 h-10" />
      </div>
      <div className="absolute z-20 top-5 right-96 ">
        <Button className="focus:outline-none" onPress={handlePress}>
          +
        </Button>
      </div>
      {alert && (
        <Alert
          message={alertMessage}
          type={alertType}
          onAlertClose={onAlertClose}
        />
      )}
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        isValidConnection={isValidConnection}
        // onKeyDown={handleKeyDown}
        onNodeClick={onNodeClick}
        nodesDraggable={true}
        panOnScroll={false}
        snapToGrid={true}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        nodeOrigin={nodeOrigin}
        onInit={onInit}
      >
        <Background variant="dots" />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
      <div className="absolute z-50 transform -translate-x-1/2 bottom-5 left-1/2">
        <Button
          size="lg"
          className="rounded-full focus:outline-none bg-[#6366F1] text-white"
          onPress={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={appContent} />
    </Routes>
  );
};

export default App;
