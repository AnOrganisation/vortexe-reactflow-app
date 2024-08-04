import React from "react";
import { Chip, Badge, Button } from "@nextui-org/react";
import { useCallback, useState, useRef } from "react";
import { Handle, Position } from "@xyflow/react";

function ActionNode({ id, data }) {
  // Reference to the node's DOM element
  const nodeRef = useRef(null);

  // Function to dispatch a backspace key event
  // const dispatchBackspaceEvent = () => {
  //   const event = new KeyboardEvent("keydown", {
  //     key: "Backspace",
  //     keyCode: 8,
  //     which: 8,
  //     bubbles: true,
  //     cancelable: true,
  //   });
  //   if (nodeRef.current) {
  //     nodeRef.current.dispatchEvent(event);
  //   }
  //   if (data.onNodesDelete) {
  //     data.onNodesDelete(id);
  //   }
  // };

  return (
    <>
      <div className="nodrag">
        <Badge
          content="-"
          color="danger"
          // onClick={dispatchBackspaceEvent}
          className="opacity-100 cursor-pointer hover:opacity-60"
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
