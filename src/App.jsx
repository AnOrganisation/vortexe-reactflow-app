import React from "react";
import { Image } from "@nextui-org/react";
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

import Navbar from "./components/ui/nav/Navbar.jsx";
import CommandBar from "./components/ui/command-bar/CommandBar.jsx";
import ChatBubble from "./components/ui/ChatBubble.jsx";
import Logo from "./assets/VortexeLogo.png";

import "./style.css";

const nodeTypes = {
  NumberInput,
  ColorPreview,
  ActionNode,
  FileNode,
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

  //State for active file content
  const [activeFileContent, setActiveFileContent] = useState(undefined);

  //State to track the clicked node
  // const [activeNodeID, setActiveNodeID] = useState(undefined);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Custom keydown handler to prevent backspace from deleting nodes
  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = (event, node) => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isNodeActive: n.id === node.id,
        },
      }))
    );
    setActiveFileContent(node.data.content);
  };

  const onUpload = async (formData) => {
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
      console.log("Success:");

      // Generate PDF from the raw content
      const pdfUrl = await generatePDF(response.data.content);

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

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="relative flex flex-row items-center justify-center w-full">
        <Navbar onUpload={onUpload} />
      </div>
      <CommandBar activeFileContent={activeFileContent} />
      <div className="absolute left-0 z-20 mt-5 ml-4">
        <Image src={Logo} alt="Vortexe Logo" className="w-10 h-10"></Image>
      </div>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onKeyDown={handleKeyDown}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background variant="dots" />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
};

export default App;
