import React from "react";
import { useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { Button, useDisclosure } from "@nextui-org/react";
function ActionNode({ id, data }) {
  // Reference to the node's DOM element
  const nodeRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="w-40 h-40 border rounded-lg bg-[#1F1F1F] nodrag">
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-white">{data.label}</p>
          <Button
            size="sm"
            onPress={onOpen}
            className="bg-[#6366F1] text-white rounded-full focus:outline-none hover:border-none mt-8"
          >
            Set Up
          </Button>
        </div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}

export default ActionNode;
