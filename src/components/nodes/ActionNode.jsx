import React from "react";
import { Chip, Badge, Button } from "@nextui-org/react";
import { useCallback, useState, useRef } from "react";
import { Handle, Position } from "@xyflow/react";

function ActionNode({ id, data }) {
  // FileNode implementation goes here

  //State to track the delete button press
  const [isDeleteButtonPressed, setIsDeleteButtonPressed] = useState(false);

  const handleDeleteButtonClick = () => {
    console.log("Delete button clicked", id);
  };

  return (
    <>
      <Badge
        content="-"
        color="danger"
        onClick={handleDeleteButtonClick}
        className="opacity-100 cursor-pointer hover:opacity-60"
      >
        <Chip size="lg" color="warning" variant="shadow">
          {data.label}
        </Chip>
      </Badge>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default ActionNode;
