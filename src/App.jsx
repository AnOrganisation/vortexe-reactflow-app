import React from "react";
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
import { v4 as uuidv4 } from "uuid";

import "./style.css";

import NumberInput from "./NumberInput.jsx";
import ColorPreview from "./ColorPreview.jsx";
import FileNode from "./FileNode.jsx";

const nodeTypes = {
  NumberInput,
  ColorPreview,
  FileNode,
};

const initialNodes = [
  {
    type: "NumberInput",
    id: "1",
    data: { label: "Red", value: 255 },
    position: { x: 0, y: 0 },
  },
  {
    type: "NumberInput",
    id: "2",
    data: { label: "Green", value: 0 },
    position: { x: 0, y: 100 },
  },
  {
    type: "NumberInput",
    id: "3",
    data: { label: "Blue", value: 115 },
    position: { x: 0, y: 200 },
  },
  {
    type: "ColorPreview",
    id: "color",
    position: { x: 150, y: 50 },
    data: { label: "Color" },
  },
];

const initialEdges = [
  {
    id: "1-color",
    source: "1",
    target: "color",
    targetHandle: "red",
  },
  {
    id: "2-color",
    source: "2",
    target: "color",
    targetHandle: "green",
  },
  {
    id: "3-color",
    source: "3",
    target: "color",
    targetHandle: "blue",
  },
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
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleClick = () => {
    console.log("Clicked");
    //TODO: add a new node to the nodes array
    // Define the new node
    const newFileNode = {
      id: uuidv4(), // Generate a unique id
      type: "FileNode", // Type of node
      data: { label: `New Node`, value: 0 },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random position
    };
    // Find the last node of the same type
    const lastNode = nodes
      .filter((node) => node.type === "FileNode")
      .slice(-1)[0];

    // Define the new edge, if there is a last node of the same type
    const newEdge = lastNode
      ? {
          id: uuidv4(), // Generate a unique id for the edge
          source: lastNode.id,
          target: newFileNode.id,
        }
      : null;

    // Add the new node to the nodes array
    setNodes((nds) => [...nds, newFileNode]);

    // Add the new edge to the edges array if it exists
    if (newEdge) {
      setEdges((eds) => [...eds, newEdge]);
    }
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button id="addbtn" onClick={handleClick}>
        Add
      </button>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
