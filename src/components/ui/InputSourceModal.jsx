import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Source from "./Source";

const InputSourceModal = ({
  isOpen,
  onOpenChange,
  sources,
  selectedSource,
  setSelectedSource,
}) => {
  return (
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
              <Button
                className="bg-[#6366F1] text-white rounded-full focus:outline-none hover:border-none mt-4"
                onPress={onClose}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InputSourceModal;
