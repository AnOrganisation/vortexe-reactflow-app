import React from "react";
import { Chip, Badge } from "@nextui-org/react";
import { useRef } from "react";
import { Handle, Position } from "@xyflow/react";

function ActionNode({ id, data }) {
  // Reference to the node's DOM element
  const nodeRef = useRef(null);

  return (
    <>
      <div className="nodrag">
        <Badge
          content="-"
          color="danger"
          className="flex items-center justify-center opacity-100 cursor-pointer hover:opacity-60"
        >
          <Chip size="lg" color="warning" variant="shadow">
            {data.label}
          </Chip>
        </Badge>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
}

export default ActionNode;
