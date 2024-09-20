// App.jsx
import React, { useState, useCallback, useRef } from "react";
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

const nodeTypes = {
  NumberInput,
  ActionNode,
  FileNode,
  OutputNode,
  DefaultInputNode,
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

  // New state variables
  const [showCommandBarForNodeAddition, setShowCommandBarForNodeAddition] =
    useState(false);
  const [newNodeData, setNewNodeData] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onInit = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  const onConnectStart = useCallback((event, params) => {
    setConnection({ source: params.nodeId, sourceHandle: params.handleId });
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane && reactFlowInstance && connection) {
        const flowPosition = reactFlowInstance.project({
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

  // Function to handle command selection from the command bar
  const handleCommandSelected = (commandData) => {
    // Use the stored newNodeData and the commandData to add the node
    const newNodeId = getId();

    const newNode = {
      type: "ActionNode", // or use commandData to determine the type
      id: newNodeId,
      position: newNodeData.position,
      data: { label: `${commandData.commandName}` },
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

  const onUpload = async (fileUrl, formData) => {
    // Logic for handling file upload
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
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

  const onAlertClose = () => {
    setAlert(false);
  };

  const handlePress = () => {
    const newNodes = [...nodes];
    const newNodeId = getId();
    const newNode = {
      type: "DefaultInputNode",
      id: newNodeId,
      position: { x: 50, y: 50 },
      data: {
        label: "Input Node",
      },
    };
    newNodes.push(newNode);
    setNodes(newNodes);
  };

  const defaultEdgeOptions = {
    animated: true,
    style: { stroke: "#006fee" },
  };

  const appContent = (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="relative flex flex-row items-center justify-center w-full">
        <Navbar onUpload={onUpload} setUserID={setUserID} />
      </div>
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
        edgeTypes={{ custom: WorkflowEdge }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onKeyDown={handleKeyDown}
        onNodeClick={onNodeClick}
        nodesDraggable={true}
        panOnScroll={false}
        snapToGrid={true}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        nodeOrigin={nodeOrigin}
        onInit={onInit}
      >
        <Background variant="dots" />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
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
