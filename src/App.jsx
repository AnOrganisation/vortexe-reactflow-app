import React from "react";
import { Image, Button } from "@nextui-org/react";
import { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import axios from "axios";
import { generatePDF } from "./pdfGenerator";

import NumberInput from "./NumberInput.jsx";
import ColorPreview from "./ColorPreview.jsx";
import ActionNode from "./components/nodes/ActionNode.jsx";
import FileNode from "./components/nodes/FileNode.jsx";
import OutputNode from "./components/nodes/OutputNode.jsx";
import DefaultInputNode from "./components/nodes/DefaultInputNode.jsx";

import Navbar from "./components/ui/nav/Navbar.jsx";
import CommandBar from "./components/ui/command-bar/CommandBar.jsx";
import ChatBubble from "./components/ui/ChatBubble.jsx";
import Logo from "./assets/VortexeLogo.png";
import Alert from "./components/Alert.jsx";

import "./style.css";
import WorkflowEdge from "./components/edges/WorkflowEdge.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";

const nodeTypes = {
  NumberInput,
  ColorPreview,
  ActionNode,
  FileNode,
  OutputNode,
  DefaultInputNode,
};

const initialNodes = (onNodeClick, activeNodeID) => {
  return [
    // {
    //   type: "NumberInput",
    //   id: "1",
    //   data: { label: "Red", value: 255 },
    //   position: { x: 0, y: 0 },
    // },
    // {
    //   type: "NumberInput",
    //   id: "2",
    //   data: { label: "Green", value: 0 },
    //   position: { x: 0, y: 100 },
    // },
    // {
    //   type: "NumberInput",
    //   id: "3",
    //   data: { label: "Blue", value: 115 },
    //   position: { x: 0, y: 200 },
    // },
    // {
    //   type: "ColorPreview",
    //   id: "color",
    //   position: { x: 150, y: 50 },
    //   data: { label: "Color" },
    // },
    // {
    //   type: "FileNode",
    //   id: "1-file",
    //   position: { x: 300, y: 100 },
    //   data: {
    //     label: "InvoicesAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.pdf",
    //     file: null,
    //     content: null,
    //     onNodeClick,
    //     activeNodeID,
    //   },
    // },
  ];
};

const initialEdges = [
  // {
  //   id: "1-color",
  //   source: "1",
  //   target: "color",
  //   targetHandle: "red",
  // },
  // {
  //   id: "2-color",
  //   source: "2",
  //   target: "color",
  //   targetHandle: "green",
  // },
  // {
  //   id: "3-color",
  //   source: "3",
  //   target: "color",
  //   targetHandle: "blue",
  // },
];

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

  //State to track the userID
  const [userID, setUserID] = useState(null);

  //State for active file content
  const [activeFileContent, setActiveFileContent] = useState(undefined);
  //State to track the clicked node
  const [activeNodeID, setActiveNodeID] = useState(undefined);

  // State to track the alert
  const [alert, setAlert] = useState(false);
  // State to track alert message
  const [alertMessage, setAlertMessage] = useState("");
  // State to track alert type
  const [alertType, setAlertType] = useState("");

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Custom keydown handler to prevent backspace from deleting nodes
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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = (event, node) => {
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
    //remove the alert when closed
    setAlert(false);
  };

  const handlePress = () => {
    const newNodes = [...nodes];
    const newNode = {
      type: "DefaultInputNode",
      id: "default-input",
      position: { x: 50, y: 50 },
      data: {
        label: "Input Node",
      },
    };
    newNodes.push(newNode);
    setNodes(newNodes);
  };

  const defaultEdgeOptions = { animated: true, style: { stroke: "#006fee" } };

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
      />
      <div className="absolute left-0 z-20 mt-5 ml-4">
        <Image src={Logo} alt="Vortexe Logo" className="w-10 h-10"></Image>
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
        ></Alert>
      )}
      {/* <div className="absolute z-30 top-80 right-40">
        <DefaultInputNode /> 
      </div> */}
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={{ custom: WorkflowEdge }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // onConnectEnd={onConnectEnd}
        onKeyDown={handleKeyDown}
        onNodeClick={onNodeClick}
        nodesDraggable={true}
        panOnScroll={false}
        snapToGrid={true}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
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
