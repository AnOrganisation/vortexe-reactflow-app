import React, { useEffect } from "react";
import { Handle, Position } from "reactflow";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import ActionFeedbackModal from "../ui/ActionFeedbackModal";

function ActionNode({ id, data, setNodes, userID }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    (async () => {
      console.log("inputData", data.inputData);
      console.log("outputData", data.outputData);
      const result = await processData(data.inputData);

      // Use setNodes to update the node's data in the global state
      if (result !== data.outputData) {
        // Update this node's outputData
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
      }
    })();
  }, [data.inputData, id, setNodes]);

  const processData = async (input) => {
    // Your processing logic here
    // return input ? input + " HELLO" : null; // Handle null inputData
    const requestData = {
      data: {
        user_id: userID,
        file_id: "none",
        data_type: "string",
        content: JSON.stringify(input),
      },
      action_req: {
        user_id: userID,
        action_id: data.actionID,
      },
    };

    try {
      const response = await axios.post(
        "https://api.vortexeai.com/workflow/v1/action/execute",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Action Response: ", response.data.response);
      return response.data.response;
    } catch (error) {
      console.error("Error processing data:", error);
      return null;
    }
  };

  return (
    <>
      <div className="w-40 h-40 border rounded-lg bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-white">{data.label}</p>
          <p className="text-white">{data.inputData}</p>
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
      <ActionFeedbackModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        apiToken={data.apiToken}
        label={data.label}
      ></ActionFeedbackModal>
    </>
  );
}

export default ActionNode;
