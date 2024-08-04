import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "ActionNode",
    data: { label: "Excel Sheet" },
    position: { x: 100, y: 25 },
  },

  {
    id: "2",
    type: "ActionNode",
    data: { label: "Simplify" },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "ActionNode",
    data: { label: "Result" },
    position: { x: 100, y: 250 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
  },
];

function Flow({
  nodeTypes,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodesDelete,
}) {
  //[edge1, edge21, edge3, edge4,...]
  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   [setNodes]
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );

  const defaultEdgeOptions = { animated: true };

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView={true}
      zoomOnDoubleClick={false}
      panOnScroll={true}
      panOnDrag={false}
      zoomOnScroll={false}
    >
      <Background variant="cross" />
    </ReactFlow>
  );
}

export default Flow;
