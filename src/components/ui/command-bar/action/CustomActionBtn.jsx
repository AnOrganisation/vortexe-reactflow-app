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
import { v4 as uuidv4 } from "uuid";

const CustomActionBtn = ({ userID, onSave }) => {
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
      // Save the custom action prompt to the backend
      const customAction = {
        user_id: userID,
        action_id: userID + uuidv4(),
        action_name: customActionName,
        prompt: {
          instruction: promptValue,
        },
        action_type: "custom",
        description: "this is a custom action",
      };
      onSave(customAction);
      // Set the custom action in the parent component's state
      // setCustomAction((prevActions) => {
      //   const newActions = new Map(prevActions);
      //   newActions.set(customActionName, promptValue);
      //   return newActions;
      // });

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
        size="5xl"
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        className="bg-[#1f1f1f] border-2 border-[#6366F1] rounded-lg shadow-lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-around gap-1 mt-5">
                <span className="mb-1">
                  Custom Action
                  <span className="text-red-500 ">*</span>
                </span>
                <Textarea
                  isRequired
                  isInvalid={customActionNameInvalid}
                  maxRows={1}
                  variant="bordered"
                  radius="sm"
                  labelPlacement="outside"
                  placeholder="Enter your custom action name here..."
                  value={customActionName}
                  onChange={handleCustomActionNameChange}
                  errorMessage="Custom action name should not be empty."
                  className="max-w-[250px] mb-2"
                />
              </ModalHeader>
              <ModalBody className="flex flex-col items-center justify-around gap-1 mt-5">
                <span className="mb-1">
                  Write command here. Please be as descriptive as possible.
                  <span className="text-red-500 ">*</span>
                </span>
                <Textarea
                  isRequired
                  isInvalid={promptInvalid}
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="For example: Create a custom email for the client described with the information given. Create this email in a professional manner, with clarity and no more than 30 sentences long"
                  value={promptValue}
                  onChange={handlePromptValueChange}
                  errorMessage="The description should be at least 5 characters long."
                  className="max-w-full"
                />
                <span className="mb-2 font-semibold">
                  Optional: To further enhance the outcome of your responses*
                </span>
                <div className="flex flex-row justify-between w-full">
                  <div className="w-[400px]">
                    <span>
                      Please upload any examples of the{" "}
                      <span className="text-[#6366F1]">structure</span> you
                      expect.
                    </span>
                    <div className="w-full h-[150px] border border-[#6366F1] rounded-lg mt-2">
                      yo
                    </div>
                  </div>
                  <div className="w-[400px]">
                    <span>
                      Please upload any examples of the{" "}
                      <span className="text-[#6366F1]">content</span> you
                      expect.
                    </span>
                    <div className="w-full h-[150px] border border-[#6366F1] rounded-lg mt-2">
                      yo
                    </div>
                  </div>
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

export default CustomActionBtn;
