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

const ActionFeedbackModal = ({
  isOpen,
  onOpenChange,
  apiToken,
  label,
  actionResult,
}) => {
  //   const handleVerification = async () => {
  //     const client_schema = {
  //       data: dataValue,
  //     };

  //     try {
  //       const response = await axios.post(
  //         "https://api.vortexeai.com/workflow/api_node/execute/wrk1",
  //         client_schema.data,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "x-api-key": apiToken,
  //           },
  //         }
  //       );
  //       console.log("API request successful: ", response.data);
  //       setIsValidSchema(true);
  //     } catch (error) {
  //       console.error("API request failed:", error);
  //     }
  //   };
  const handleFileChange = async (event) => {
    console.log("File", event.target.files[0]);
  };

  const [feedback, setFeedback] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  const handleFeedbackChange = (event) => {
    console.log("Feedback:", event.target.value);
    setFeedback(event.target.value);
  };

  const handleExpectedOutputChange = (event) => {
    console.log("Expected Output:", event.target.value);
    setExpectedOutput(event.target.value);
  };

  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="bg-[#1f1f1f]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{label}</ModalHeader>
            <ModalBody className="overflow-y-auto custom-scrollbar">
              <div className="flex flex-col items-center justify-center w-full h-full mb-3">
                <p className="p-2 mx-2 mt-3 text-xl">Result</p>
                <Textarea
                  minRows={10}
                  placeholder=""
                  value={actionResult}
                  className="bg-inherit"
                  variant="bordered"
                  readOnly
                />
                <p className="p-2 mx-2 mt-3 text-xl">
                  Explain in 3 to 4 sentences what went wrong?
                </p>
                <Textarea
                  minRows={10}
                  placeholder="For example: There was missing context about xyz, There are too many sentences in the paragraph and should only contain 5 sentences, etc."
                  value={feedback}
                  onChange={handleFeedbackChange}
                  className="bg-inherit"
                  variant="bordered"
                />
                <div className="flex flex-col items-center justify-center w-full mb-5">
                  <p className="p-2 mx-2 mt-3 mb-3 text-xl">
                    Please upload an example or explain a response you were
                    expecting. You may also do both.
                  </p>
                  <Button
                    isIconOnly
                    radius="md"
                    type="submit"
                    className="w-[128px] h-[129px] bg-transparent text-white focus:outline-none flex flex-col cursor-pointer border-white rounded-lg"
                  >
                    <p>Upload</p>
                    <div className="w-6 h-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                        />
                      </svg>
                    </div>
                    <input
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      type="file"
                      onChange={(event) => handleFileChange(event)}
                    />
                  </Button>
                </div>
                <Textarea
                  minRows={10}
                  placeholder="Type here..."
                  value={expectedOutput}
                  onChange={handleExpectedOutputChange}
                  className="bg-inherit"
                  variant="bordered"
                />
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center justify-center">
              <Button
                className="bg-[#6366F1] text-white rounded-full focus:outline-none hover:border-none mt-4"
                onPress={() => {
                  onClose();
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ActionFeedbackModal;
