import React, { useEffect } from "react";
import { Handle, Position } from "reactflow";
import { Button, useDisclosure } from "@nextui-org/react";

function ActionNode({ id, data, setNodes }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    console.log("inputData", data.inputData);
    console.log("outputData", data.outputData);
    const result = processData(data.inputData);

    // Use setNodes to update the node's data in the global state
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              outputData: result,
            },
          };
        }
        return node;
      })
    );

    data.updateDownstreamNodes(id, result);
  }, [data.inputData, id, setNodes]);

  const processData = (input) => {
    // Your processing logic here
    return input ? input + " HELLO" : null; // Handle null inputData
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
        <Handle
          type="target"
          position={Position.Left}
          id="target"
          isConnectable={true}
        />
        <Handle
          type="source"
          position={Position.Right}
          id="source"
          isConnectable={true}
        />
      </div>
    </>
  );
}

export default ActionNode;
