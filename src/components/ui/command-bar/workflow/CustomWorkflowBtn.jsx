import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import Flow from "../../../nodes/Flow";
import Command from "../action/Command";

const CustomWorkflowBtn = ({ setCustomWorkflow, commands }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //State to store the custom action name
  const [customWorkflowName, setCustomWorkflowName] = useState("");

  //State to store if the custom action name is invalid
  const [customWorkflowNameInvalid, setCustomWorkflowNameInvalid] =
    useState(false);

  // State to track the search query
  const [searchQuery, setSearchQuery] = useState("");

  //State to track all actions in the command map
  const [allActions, setAllActions] = useState(new Map());

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredActions = new Map(
        Array.from(commands).filter(([key, value]) =>
          key.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setAllActions(filteredActions);
    } else {
      setAllActions(commands);
    }
  }, [searchQuery, commands]);

  //Function to handle the opening of the modal
  const handleOpen = () => {
    onOpen();
  };

  const handleCustomWorkflowNameChange = (event) => {
    const newValue = event.target.value;
    setCustomWorkflowName(newValue);
    setCustomWorkflowNameInvalid(newValue.length < 1);
  };

  const handleSave = () => {
    if (customWorkflowName === "") {
      setCustomWorkflowNameInvalid(true);
      return;
    } else {
      /**
       *TODO: Set the custom workflow in the parent component's state
       */
      setCustomWorkflow((prevWorkflows) => {
        const newWorkflows = new Map(prevWorkflows);
        newWorkflows.set(customWorkflowName, [
          "Custom Actions 1",
          "Custom Actions 2",
        ]);
        return newWorkflows;
      });

      // Reset the form and close the modal
      setCustomWorkflowName("");
      setCustomWorkflowNameInvalid(false);

      // Close the modal when the workflow is saved
      onClose();
    }
  };

  return (
    <>
      <Button
        onPress={() => handleOpen()}
        className="w-[155px] h-[27px] p-2 text-white bg-[#6366F1] text-sm ml-2 rounded-full mb-10 mt-3 focus:outline-none"
      >
        <div className="relative flex items-center justify-center">
          <p className="absolute">Custom Workflow +</p>
        </div>
      </Button>
      <Modal
        size="3xl"
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        className="bg-[#1f1f1f] border-2 border-[#6366F1] rounded-lg shadow-lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1 mt-5">
                <Textarea
                  isRequired
                  isInvalid={customWorkflowNameInvalid}
                  maxRows={1}
                  variant="bordered"
                  radius="sm"
                  label={
                    <span style={{ color: "white" }}>Custom Workflow Name</span>
                  }
                  labelPlacement="outside"
                  placeholder="Enter your custom workflow name here..."
                  value={customWorkflowName}
                  onChange={handleCustomWorkflowNameChange}
                  errorMessage="Custom workflow name should not be empty."
                  className="max-w-[250px]"
                />
              </ModalHeader>
              <ModalBody className="flex flex-row">
                <div className="w-[200px] h-[500px]">
                  <div className="w-[172px] h-full border border-[#6366F1] rounded-lg flex flex-col items-center">
                    <input
                      type="text"
                      className="w-[148px] h-[14px] p-2 mb-4 text-white border-none rounded-full outline-none mt-5 bg-[#6366F1] bg-opacity-40 text-xs"
                      placeholder="Search an action"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="mb-3 space-y-2 overflow-y-auto max-h-96 custom-scrollbar">
                      {Array.from(allActions).map(([key, value], index) => (
                        <Command key={index} commandName={key} prompt={value} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 h-96">
                  <Flow />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSave}
                  className="focus:outline-none"
                >
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

export default CustomWorkflowBtn;
