import React, { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Handle, Position } from "reactflow";
import SalesforceLogo from "../../assets/salesforcelogo.png";
import ApplicationIcon from "../ui/ApplicationIcon";
import FileIcon from "../ui/command-bar/action/FileIcon";
import InputSourceModal from "../ui/InputSourceModal";
import "../../style.css";
import IngestionAPISetupModal from "../ui/IngestionAPISetupModal";

const DefaultInputNode = ({ data }) => {
  const IOSource = [
    {
      name: "Salesforce",
      logo: SalesforceLogo,
    },
    {
      name: "API Ingestion",
      logo: ApplicationIcon,
    },
    {
      name: "Application 2",
      logo: ApplicationIcon,
    },
    {
      name: "Application 3",
      logo: ApplicationIcon,
    },
    {
      name: "Application 4",
      logo: ApplicationIcon,
    },
    {
      name: "Application 5",
      logo: ApplicationIcon,
    },
    {
      name: "Files",
      logo: FileIcon,
    },
    {
      name: "Files 1",
      logo: FileIcon,
    },
    {
      name: "Files 2",
      logo: FileIcon,
    },
  ];
  const [selectedSource, setSelectedSource] = useState(null);
  const [sources, setSources] = useState(IOSource);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [schemaValue, setSchemaValue] = useState(""); // Lift state up
  const handleSchemaChange = (e) => {
    setSchemaValue(e.target.value);
  };

  const handleSchemaSave = (value) => {
    console.log("Schema saved: ", value);
  };

  return (
    <>
      <div className="w-40 h-40 border rounded-lg bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-white">
            {selectedSource === "API Ingestion"
              ? "API Ingestion Node"
              : data.label}
          </p>
          <Button
            size="sm"
            onPress={onOpen}
            className="bg-[#6366F1] text-white rounded-full focus:outline-none hover:border-none mt-8"
          >
            Set Up
          </Button>
        </div>
        <Handle type="source" position={Position.Right} />
      </div>
      <IngestionAPISetupModal
        isOpen={isOpen && selectedSource === "API Ingestion"}
        onOpenChange={onOpenChange}
        handleSchemaSave={handleSchemaSave}
        schemaValue={schemaValue}
        handleSchemaChange={handleSchemaChange}
      ></IngestionAPISetupModal>
      <InputSourceModal
        isOpen={isOpen && selectedSource !== "API Ingestion"}
        onOpenChange={onOpenChange}
        sources={sources}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
    </>
  );
};

export default DefaultInputNode;
