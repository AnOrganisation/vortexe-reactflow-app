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
import { Handle, Position } from "@xyflow/react";
import Source from "../ui/Source";
import SalesforceLogo from "../../assets/salesforcelogo.png";
import ApplicationIcon from "../ui/ApplicationIcon";
import FileIcon from "../ui/command-bar/action/FileIcon";
import "../../style.css";

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
        <Handle type="source" position={Position.Right} />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-[#1f1f1f]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Input Action
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center justify-center w-full">
                  <p className="p-2 mx-2 mt-3 text-sm font-light">
                    Pick which source you would like your data to come from
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full mb-3">
                  <div className="w-[90%] h-[400px] rounded-lg ml-5 mt-2 cursor-default overflow-y-auto custom-scrollbar">
                    {sources.map((source, index) => (
                      <Source
                        key={index}
                        source={source}
                        selectedSource={selectedSource}
                        setSelectedSource={setSelectedSource}
                      />
                    ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center">
                <Button className="bg-[#6366F1] text-white rounded-full focus:outline-none hover:border-none mt-4">
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DefaultInputNode;
