import React from "react";
import { useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { Button, useDisclosure } from "@nextui-org/react";
function ActionNode({ id, data }) {
  // Reference to the node's DOM element
  const nodeRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    console.log("inputData", data.inputData);
    console.log("outputData", data.outputData);
    const result = processData(data.inputData);
    data.outputData = result;
    data.updateDownstreamNodes(id, result);
  }, [data.inputData]); // Only re-run effect if 'data' changes

  const processData = (input) => {
    // Your processing logic here
    // For example, modify or transform the input data
    input = input + " " + "HELLO";
    return input; // Replace with actual processing
  };

  return (
    <>
      <div className="w-40 h-40 border rounded-lg bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-white">{data.label}</p>
          <p className="text-white">{JSON.stringify(data.inputData)}</p>
          <Button
            size="sm"
            onPress={onOpen}
            className="bg-[#6366F1] text-white rounded-full focus:outline-none hover:border-none mt-8"
          >
            Edit
          </Button>
        </div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}

export default ActionNode;
