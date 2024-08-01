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
import React, { useState } from "react";
import Flow from "../../../nodes/Flow";

const CustomWorkflowBtn = ({ setCustomWorkflow }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //State to store the custom action name
  const [customWorkflowName, setCustomWorkflowName] = useState("");

  //State to store if the custom action name is invalid
  const [customWorkflowNameInvalid, setCustomWorkflowNameInvalid] =
    useState(false);

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
        size="xs"
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        className="bg-[#1f1f1f] border-2 border-[#6366F1] rounded-lg shadow-lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-5">
                <Textarea
                  isRequired
                  isInvalid={customWorkflowNameInvalid}
                  maxRows={1}
                  variant="bordered"
                  radius="sm"
                  label="Custom Workflow Name"
                  placeholder="Enter your custom workflow name here..."
                  value={customWorkflowName}
                  onChange={handleCustomWorkflowNameChange}
                  errorMessage="Custom workflow name should not be empty."
                  className="max-w-[250px]"
                />
              </ModalHeader>
              <ModalBody>
                <div className="w-72 h-96">
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
