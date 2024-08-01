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

const CustomActionBtn = ({ setCustomAction }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //State to store the custom action name
  const [customActionName, setCustomActionName] = useState("");

  //State to store if the custom action name is invalid
  const [customActionNameInvalid, setCustomActionNameInvalid] = useState(false);

  //State to store if the prompt is invalid
  const [promptInvalid, setPromptInvalid] = useState(false);

  //State to store the prompt value
  const [promptValue, setPromptValue] = useState("");

  const handlePromptValueChange = (event) => {
    const newValue = event.target.value;
    setPromptValue(newValue);
    setPromptInvalid(newValue.length < 5);
  };

  //Function to handle the opening of the modal
  const handleOpen = () => {
    onOpen();
  };

  const handleCustomActionNameChange = (event) => {
    const newValue = event.target.value;
    setCustomActionName(newValue);
    setCustomActionNameInvalid(newValue.length < 1);
  };

  //Function to handle the submission of the custom action prompt
  const handleSave = () => {
    if (promptInvalid || promptValue === "") {
      setPromptInvalid(true);
      return;
    } else if (customActionName === "") {
      setCustomActionNameInvalid(true);
      return;
    } else {
      // Set the custom action in the parent component's state
      setCustomAction((prevActions) => {
        const newActions = new Map(prevActions);
        newActions.set(customActionName, promptValue);
        return newActions;
      });
      // Reset the form and close the modal
      setCustomActionName("");
      setPromptValue("");
      setCustomActionNameInvalid(false);
      setPromptInvalid(false);

      // Close the modal after successful submission
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
          <p className="absolute">Custom Action +</p>
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
                  isInvalid={customActionNameInvalid}
                  maxRows={1}
                  variant="bordered"
                  radius="sm"
                  label="Custom Action Name"
                  placeholder="Enter your custom action name here..."
                  value={customActionName}
                  onChange={handleCustomActionNameChange}
                  errorMessage="Custom action name should not be empty."
                  className="max-w-[250px]"
                />
              </ModalHeader>
              <ModalBody>
                <Textarea
                  isRequired
                  isInvalid={promptInvalid}
                  variant="bordered"
                  label="Prompt"
                  placeholder="Write your prompt here..."
                  value={promptValue}
                  onChange={handlePromptValueChange}
                  errorMessage="The description should be at least 5 characters long."
                  className="max-w-[250px]"
                />
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

export default CustomActionBtn;
