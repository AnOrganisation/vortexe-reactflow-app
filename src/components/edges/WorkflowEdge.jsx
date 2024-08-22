// CustomEdge.jsx
import React from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";
import WorkflowOutputLabel from "./WorkflowOutputLabel";

export default function WorkflowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
            minWidth: "100px",
            color: "white",
            borderRadius: "5px",
          }}
          className="nodrag nopan"
        >
          <WorkflowOutputLabel label={data?.label} commands={data?.commands} />
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
