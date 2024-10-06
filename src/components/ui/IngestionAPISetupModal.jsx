import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Image,
} from "@nextui-org/react";
import CopyIcon from "./CopyIcon";
import axios from "axios";

const IngestionAPISetupModal = ({
  isOpen,
  onOpenChange,
  handleSchemaSave,
  schemaValue,
  handleSchemaChange,
}) => {
  const [testData, setTestData] = useState("");
  const [isValidSchema, setIsValidSchema] = useState(false);

  const handleVerification = async () => {
    // Perform schema validation here
    // setIsValidSchema(true); // For demonstration purposes, set as true
    const client_schema = {
      client_schema: JSON.parse(schemaValue),
      data: JSON.parse(testData),
    };

    try {
      const response = await axios.post(
        "https://api.vortexeai.com/workflow/api_node/execute",
        client_schema,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API request successful: ", response.data);
      setIsValidSchema(true);
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="bg-[#1f1f1f]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              REST API Node
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center justify-center w-full">
                <p className="p-2 mx-2 mt-3 text-2xl">Schema</p>
              </div>
              <div className="flex flex-col items-center justify-center w-full h-full mb-3">
                <Textarea
                  minRows={10}
                  placeholder="Enter your schema"
                  className="bg-inherit"
                  variant="bordered"
                  value={schemaValue}
                  onChange={handleSchemaChange}
                />
                <div className="flex items-center justify-center w-full">
                  <p className="p-2 mx-2 mt-3 text-2xl">Test Data</p>
                </div>
                <Textarea
                  minRows={10}
                  placeholder="Enter your schema"
                  className="bg-inherit"
                  variant="bordered"
                  value={testData}
                  onChange={(e) => setTestData(e.target.value)}
                />

                <p className="p-2 mx-2 mt-3 text-2xl">Endpoint</p>
                <div className="flex flex-row items-center justify-between w-full p-3 border-2 rounded-lg">
                  <p>https://api.vortexeai.com/workflow/api_node/execute</p>
                  <div className="cursor-pointer">
                    <CopyIcon className="w-8 h-8 text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center justify-center">
              {isValidSchema ? (
                <Button
                  className="bg-[#6366F1] text-white rounded-full focus:outline-none hover:border-none mt-4"
                  onPress={() => {
                    onClose();
                    handleSchemaSave(schemaValue);
                  }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  className="bg-[#6366F1] text-white rounded-full focus:outline-none hover:border-none mt-4"
                  onPress={handleVerification}
                >
                  Verify
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default IngestionAPISetupModal;
