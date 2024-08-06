import React from "react";
import { Image } from "@nextui-org/react";
import { useCallback, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

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

const initialNodes = [
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
  {
    type: "FileNode",
    id: "1-file",
    position: { x: 300, y: 100 },
    data: {
      label: "InvoicesAAAAAAAAADDDDDDDDD.pdf",
    },
  },
];

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
        return "#ff0072";
    }
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="relative flex flex-row items-center justify-center w-full">
        <Navbar />
      </div>
      <CommandBar />
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
        selectionKeyCode={16} // Shift key
        multiSelectionKeyCode={17} // Ctrl key
        fitView
      >
        <Background variant="dots" />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    </div>
  );
};

export default App;
