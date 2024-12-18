import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
} from "@nextui-org/react";
import React, { useState, useRef } from "react";
import { ChevronDownIcon } from "../../nav/nav-items/ChevronDownIcon";
import UploadedActionFile from "./UploadedActionFile";
import axios from "axios";
import "../../../../style.css";

import FileIcon from "./FileIcon";
import TextIcon from "./TextIcon";

const CustomActionBtn = ({ userID, onSave }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef(null);

  //State to store the custom action name
  const [customActionName, setCustomActionName] = useState("");

  //State to store if the custom action name is invalid
  const [customActionNameInvalid, setCustomActionNameInvalid] = useState(false);

  //State to store if the prompt is invalid
  const [promptInvalid, setPromptInvalid] = useState(false);

  //State to store the prompt value
  const [promptValue, setPromptValue] = useState("");

  //State to toggle upload or file view for the structure upload
  const [structureViewType, setStructureViewType] = useState("upload");

  //State to toggle upload or file view for the content upload
  const [contentViewType, setContentViewType] = useState("upload");

  //State to store the uploaded strucuture files
  const [structureFiles, setStructureFiles] = useState([]);

  //State to store the uploaded content files
  const [contentFiles, setContentFiles] = useState([]);

  const tones = [
    {
      key: "marketing",
      label: "Marketing",
    },
    {
      key: "professional",
      label: "Professional",
    },
    {
      key: "hr",
      label: "HR",
    },
    {
      key: "casual",
      label: "Casual",
    },
    {
      key: "technical",
      label: "Technical",
    },
    {
      key: "artistic",
      label: "Artistic",
    },
    {
      key: "none",
      label: "None",
    },
  ];

  const formatting = [
    {
      key: "email",
      label: "Email",
    },
    {
      key: "paragraph",
      label: "Paragraph",
    },
    {
      key: "bullet point",
      label: "Bullet Point",
    },
    {
      key: "sections",
      label: "Sections",
    },
    {
      key: "MLA",
      label: "MLA",
    },
    {
      key: "single-sentence",
      label: "Single Sentence",
    },
    {
      key: "none",
      label: "None",
    },
  ];

  const toneMap = new Map([
    ["marketing", "Marketing"],
    ["professional", "Professional"],
    ["hr", "HR"],
    ["casual", "Casual"],
    ["technical", "Technical"],
    ["artistic", "Artistic"],
    ["none", "None"],
  ]);

  const [selectedToneOption, setSelectedToneOption] = useState(
    new Set(["Tone"])
  );

  const formattingMap = new Map([
    ["email", "Email"],
    ["paragraph", "Paragraph"],
    ["bullet point", "Bullet Point"],
    ["sections", "Sections"],
    ["MLA", "MLA"],
    ["single-sentence", "Single Sentence"],
    ["none", "None"],
  ]);

  const [selectedFormattingOption, setSelectedFormattingOption] = useState(
    new Set(["Formatting"])
  );

  //State to track the structure input value
  const [structureInputValue, setStructureInputValue] = useState("");

  //State to track the content input value
  const [contentInputValue, setContentInputValue] = useState("");

  const onUpload = async (formData) => {
    try {
      const response = await axios.post(
        "https://api.vortexeai.com/upload/upload",
        formData
      );
      console.log("File uploaded successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
      return;
    }
  };

  const handleFileChange = async (event, reference) => {
    if (event) {
      let selectedFile = event.target.files[0];
      const fileUrl = URL.createObjectURL(selectedFile); // For local preview purposes

      const formData = new FormData();
      formData.append("user_id", userID);
      formData.append("file", selectedFile);
      formData.append("workflow_id", "wrk1");

      const response = await onUpload(formData); // Upload the file to the backend

      if (reference === "structure") {
        setStructureViewType("file");

        // Check if the file already exists in structureFiles before updating the state
        if (!structureFiles.some((file) => file.file_id === response.file_id)) {
          setStructureFiles((prevFiles) => [
            ...prevFiles,
            { file_id: response.file_id, filename: response.filename },
          ]);
        }
      } else if (reference === "content") {
        setContentViewType("file");

        // Check if the file already exists in contentFiles before updating the state
        if (!contentFiles.some((file) => file.file_id === response.file_id)) {
          setContentFiles((prevFiles) => [
            ...prevFiles,
            { file_id: response.file_id, filename: response.filename },
          ]);
        }
      }
    }
  };

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

  const resetForm = () => {
    setCustomActionName("");
    setPromptValue("");
    setCustomActionNameInvalid(false);
    setPromptInvalid(false);
    setContentViewType("upload");
    setStructureViewType("upload");
    setStructureFiles([]);
    setContentFiles([]);
    setStructureInputValue("");
    setContentInputValue("");
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
        action_id: null,
        action_name: customActionName,
        prompt: {
          instruction: promptValue,
          structure:
            structureFiles.length >= 1
              ? JSON.stringify(structureFiles)
              : structureInputValue,
          content:
            contentFiles.length >= 1
              ? JSON.stringify(contentFiles)
              : contentInputValue,
          tone: selectedToneOption === "Tone" ? "None" : selectedToneOption,
          formatting:
            selectedFormattingOption === "Formatting"
              ? "None"
              : selectedFormattingOption,
        },
        action_type: "custom",
        description: "Custom Action",
        model_configuration: null,
      };
      onSave(customAction);

      // Reset the form and close the modal
      resetForm();
      // Close the modal after successful submission
      onClose();
    }
  };

  const handleToneSelectionChange = (keys) => {
    const selectedToneKey = Array.from(keys)[0];
    setSelectedToneOption(toneMap.get(selectedToneKey));
  };

  const handleFormattingSelectionChange = (keys) => {
    console.log(keys);
    const selectedFormattingKey = Array.from(keys)[0];
    setSelectedFormattingOption(formattingMap.get(selectedFormattingKey));
  };

  const handleDeleteStructureFile = (fileId) => {
    //there is only one structure file, but we are keeping this logic in case there are more files in the future
    setStructureFiles(structureFiles.filter((file) => file.file_id !== fileId));
    // since there is only one structure file, we will change the view type to "upload"
    setStructureViewType("upload");
  };

  const handleDeleteContentFile = (fileId) => {
    setContentFiles(contentFiles.filter((file) => file.file_id !== fileId));
  };

  const handleStructureInputChange = (event) => {
    setStructureInputValue(event.target.value);
  };

  const handleContentInputChange = (event) => {
    setContentInputValue(event.target.value);
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
                    <div className="w-full h-[230px] border border-[#6366F1] rounded-lg mt-2 flex flex-col justify-center items-center overflow-hidden">
                      <div className="flex flex-col items-center justify-center w-full mt-5 focus:outline-none">
                        <Tabs
                          aria-label="Options"
                          color="default"
                          variant="light"
                          size="sm"
                        >
                          <Tab
                            key="photos"
                            title={
                              <div className="flex items-center space-x-2">
                                <FileIcon />
                                <span>Upload</span>
                              </div>
                            }
                            className="focus:outline-none"
                          >
                            {structureViewType === "upload" ? (
                              <div className="flex flex-col items-center justify-center w-32 h-32 my-5 border border-white rounded-lg cursor-pointer">
                                <Button
                                  isIconOnly
                                  radius="md"
                                  type="submit"
                                  className="w-[128px] h-[129px] bg-transparent text-white focus:outline-none flex flex-col cursor-pointer"
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
                                    ref={inputRef}
                                    onChange={(event) =>
                                      handleFileChange(event, "structure")
                                    }
                                  />
                                </Button>
                              </div>
                            ) : (
                              <>
                                {/* Make this div scrollable horizontally */}
                                <div className="flex flex-row items-center justify-center w-full h-full gap-6 px-4 my-2">
                                  {structureFiles.map((file) => (
                                    <UploadedActionFile
                                      key={file.filename}
                                      file={file}
                                      onDelete={() => {
                                        handleDeleteStructureFile(file.file_id);
                                      }}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </Tab>
                          <Tab
                            key="type"
                            title={
                              <div className="flex items-center space-x-2">
                                <TextIcon />
                                <span>Text</span>
                              </div>
                            }
                            className="focus:outline-none"
                          >
                            <Textarea
                              variant="bordered"
                              size="lg"
                              labelPlacement="outside"
                              placeholder="Describe the structure you want to model the response after"
                              onChange={handleStructureInputChange}
                              value={structureInputValue}
                              className="min-w-xl"
                            />
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                  <div className="w-[400px]">
                    <span>
                      Please upload any examples of the{" "}
                      <span className="text-[#6366F1]">content</span> you
                      expect.
                    </span>
                    <div className="w-full h-[230px] border border-[#6366F1] rounded-lg mt-2 flex flex-col justify-center items-center overflow-hidden">
                      <div className="flex flex-col items-center justify-center w-full mt-5 focus:outline-none">
                        <Tabs
                          aria-label="Options"
                          color="default"
                          variant="light"
                          size="sm"
                        >
                          <Tab
                            key="photos"
                            title={
                              <div className="flex items-center space-x-2">
                                <FileIcon />
                                <span>Upload</span>
                              </div>
                            }
                            className="focus:outline-none"
                          >
                            {contentViewType === "upload" ? (
                              <div className="flex flex-col items-center justify-center w-32 h-32 my-5 border border-white rounded-lg cursor-pointer">
                                <Button
                                  isIconOnly
                                  radius="md"
                                  type="submit"
                                  className="w-[128px] h-[129px] bg-transparent text-white focus:outline-none flex flex-col cursor-pointer"
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
                                    ref={inputRef}
                                    onChange={(event) =>
                                      handleFileChange(event, "content")
                                    }
                                  />
                                </Button>
                              </div>
                            ) : (
                              <div className="w-full overflow-x-auto">
                                {" "}
                                {/* Ensure overflow works here */}
                                <div className="flex flex-row gap-6 px-4 my-5 overflow-x-auto custom-scrollbar">
                                  {contentFiles.map((file) => (
                                    <UploadedActionFile
                                      key={file.filename}
                                      file={file}
                                      onDelete={handleDeleteContentFile}
                                    />
                                  ))}
                                  <Button
                                    isIconOnly
                                    radius="md"
                                    type="submit"
                                    className="flex flex-col my-3 text-white bg-transparent border border-white cursor-pointer w-28 h-28 focus:outline-none"
                                  >
                                    <div className="w-6 h-6">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                      </svg>
                                    </div>
                                    <input
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      type="file"
                                      ref={inputRef}
                                      onChange={(event) =>
                                        handleFileChange(event, "content")
                                      }
                                    />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Tab>

                          <Tab
                            key="type"
                            title={
                              <div className="flex items-center space-x-2">
                                <TextIcon />
                                <span>Text</span>
                              </div>
                            }
                            className="focus:outline-none"
                          >
                            <Textarea
                              variant="bordered"
                              size="lg"
                              labelPlacement="outside"
                              placeholder="Describe the content you want in the response"
                              onChange={handleContentInputChange}
                              value={contentInputValue}
                              className="min-w-xl"
                            />
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="font-semibold">
                    Warning: Text input will be ignored if a file was already
                    uploaded
                  </p>
                </div>
                <div className="flex flex-row justify-between w-full mt-10">
                  <div className="flex flex-row items-center justify-center w-[39.5%]">
                    <Dropdown placement="bottom-end" className="bg-[#1F1F1F]">
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          className="flex flex-row items-center justify-evenly text-white h-10 w-[150px] bg-transparent border border-[#6366F1] rounded-full focus:outline-none"
                        >
                          <p>{selectedToneOption}</p>
                          <ChevronDownIcon />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dynamic Tones"
                        items={tones}
                        disallowEmptySelection
                        selectedKeys={selectedToneOption}
                        selectionMode="single"
                        onSelectionChange={handleToneSelectionChange}
                      >
                        {(item) => (
                          <DropdownItem
                            key={item.key}
                            color={item.key === "delete" ? "danger" : "default"}
                            className={
                              item.key === "delete" ? "text-danger" : ""
                            }
                            textValue={item.label.toLowerCase()}
                          >
                            {item.label}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                  <div className="flex flex-row items-center justify-center w-[39.5%]">
                    <Dropdown placement="bottom-end" className="bg-[#1F1F1F]">
                      <DropdownTrigger>
                        <Button
                          isIconOnly
                          className="flex flex-row items-center justify-evenly text-white h-10 w-[150px] bg-transparent border border-[#6366F1] rounded-full focus:outline-none"
                        >
                          <p>{selectedFormattingOption}</p>
                          <ChevronDownIcon />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Dynamic Formats"
                        items={formatting}
                        disallowEmptySelection
                        selectedKeys={selectedFormattingOption}
                        selectionMode="single"
                        onSelectionChange={handleFormattingSelectionChange}
                      >
                        {(item) => (
                          <DropdownItem
                            key={item.key}
                            color={item.key === "delete" ? "danger" : "default"}
                            className={
                              item.key === "delete" ? "text-danger" : ""
                            }
                            textValue={item.label.toLowerCase()}
                          >
                            {item.label}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    resetForm();
                    onClose();
                  }}
                >
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
