// ActionFeedbackModal.jsx

import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

import InlineStyleControls from "./InlineStyleControls";

const ActionFeedbackModal = ({
  isOpen,
  onOpenChange,
  apiToken,
  label,
  actionResult,
  theme = "dark",
}) => {
  const [feedbackEditorState, setFeedbackEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [expectedOutputEditorState, setExpectedOutputEditorState] = useState(
    () => EditorState.createEmpty()
  );
  const [actionResultEditorState, setActionResultEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [file, setFile] = useState(null);

  const feedbackEditorRef = useRef(null);
  const expectedOutputEditorRef = useRef(null);

  // Initialize the actionResultEditorState with actionResult content
  useEffect(() => {
    if (actionResult) {
      const contentState = ContentState.createFromText(actionResult);
      const newEditorState = EditorState.createWithContent(contentState);
      setActionResultEditorState(newEditorState);
    }
  }, [actionResult]);

  const handleFileChange = (event) => {
    console.log("File", event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleFeedbackChange = (newEditorState) => {
    setFeedbackEditorState(newEditorState);
  };

  const handleExpectedOutputChange = (newEditorState) => {
    setExpectedOutputEditorState(newEditorState);
  };

  const handleKeyCommand = (command, editorState, setEditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (editorState, setEditorState, style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleSubmit = () => {
    // Extract the content from the editors
    const feedbackContentState = feedbackEditorState.getCurrentContent();
    const expectedOutputContentState =
      expectedOutputEditorState.getCurrentContent();

    const feedback = feedbackContentState.getPlainText();
    const expectedOutput = expectedOutputContentState.getPlainText();

    console.log("Feedback:", feedback);
    console.log("Expected Output:", expectedOutput);

    // Handle file upload if necessary
    if (file) {
      console.log("File to upload:", file);
      // Implement file upload logic here
    }

    // Perform any further actions (e.g., send data to server)

    // Close the modal
    onOpenChange(false);
  };

  // Theme-based classes
  const editorContainerClass =
    theme === "light"
      ? "bg-white text-black border border-gray-300"
      : "bg-gray-800 text-white border border-gray-700";

  const modalContentClass = theme === "light" ? "bg-white" : "bg-[#1f1f1f]";

  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className={modalContentClass}>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{label}</ModalHeader>
            <ModalBody className="overflow-y-auto custom-scrollbar">
              <div className="flex flex-col items-center justify-center w-full h-full mb-3">
                {/* Action Result */}
                <p className="p-2 mx-2 mt-3 text-xl">Result</p>
                <div
                  className={`${editorContainerClass} p-2 w-full min-h-[150px]`}
                >
                  <Editor
                    editorState={actionResultEditorState}
                    readOnly={true}
                  />
                </div>

                {/* Feedback Editor */}
                <p className="p-2 mx-2 mt-3 text-xl">
                  Explain in 3 to 4 sentences what went wrong?
                </p>
                <div className="w-full">
                  <InlineStyleControls
                    editorState={feedbackEditorState}
                    onToggle={(style) => {
                      toggleInlineStyle(
                        feedbackEditorState,
                        setFeedbackEditorState,
                        style
                      );
                    }}
                    theme={theme}
                  />
                  <div
                    className={`${editorContainerClass} p-2 min-h-[150px]`}
                    onClick={() => feedbackEditorRef.current.focus()}
                  >
                    <Editor
                      editorState={feedbackEditorState}
                      onChange={handleFeedbackChange}
                      handleKeyCommand={(command, editorState) =>
                        handleKeyCommand(
                          command,
                          editorState,
                          setFeedbackEditorState
                        )
                      }
                      ref={(element) => {
                        feedbackEditorRef.current = element;
                      }}
                    />
                  </div>
                </div>

                {/* File Upload */}
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
                      onChange={handleFileChange}
                    />
                  </Button>
                </div>

                {/* Expected Output Editor */}
                <div className="w-full">
                  <InlineStyleControls
                    editorState={expectedOutputEditorState}
                    onToggle={(style) => {
                      toggleInlineStyle(
                        expectedOutputEditorState,
                        setExpectedOutputEditorState,
                        style
                      );
                    }}
                    theme={theme}
                  />
                  <div
                    className={`${editorContainerClass} p-2 min-h-[150px]`}
                    onClick={() => expectedOutputEditorRef.current.focus()}
                  >
                    <Editor
                      editorState={expectedOutputEditorState}
                      onChange={handleExpectedOutputChange}
                      handleKeyCommand={(command, editorState) =>
                        handleKeyCommand(
                          command,
                          editorState,
                          setExpectedOutputEditorState
                        )
                      }
                      ref={(element) => {
                        expectedOutputEditorRef.current = element;
                      }}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex items-center justify-center">
              <Button
                className="bg-[#6366F1] text-white rounded-full focus:outline-none hover:border-none mt-4"
                onPress={handleSubmit}
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
