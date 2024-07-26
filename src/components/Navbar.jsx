import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Image,
  Input,
} from "@nextui-org/react";
import { ChevronDownIcon } from "./ChevronDownIcon";

/**
 * Navbar component that provides a navigation bar with upload button, workspace selection dropdown, and user avatar.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  const inputRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(new Set(["Workspace1"]));

  const descriptionsMap = {
    Workspace1: "Your Default Workspace.",
    Workspace2: "Workspace for ARTG-180",
    Workspace3: "A brand new workspace just for you",
  };

  const [labelsMap, setLabelsMap] = useState({
    Workspace1: "My Workspace 1",
    Workspace2: "Art Workspace",
    Workspace3: "New Workspace",
  });
  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

  const [workspaceInputValue, setWorkspaceInputValue] = useState(
    labelsMap[selectedOptionValue] || ""
  );

  const handleWorkspaceInputChange = (event) => {
    const newValue = event.target.value;
    setWorkspaceInputValue(newValue);
    /**
     * TODO: Add a new workspace logic here
     * *Enable for adding a new workspace
     */
    //setSelectedOption(new Set([newValue]));
  };

  const [WorkspaceBtnPressed, setWorkspaceBtnPressed] = useState(false);

  const handleWorkspaceButtonClick = () => {
    setWorkspaceBtnPressed(!WorkspaceBtnPressed);
  };

  useEffect(() => {
    if (WorkspaceBtnPressed && inputRef.current) {
      inputRef.current.focus();
    }
  }, [WorkspaceBtnPressed]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      /**
       * TODO: Add a new workspace logic here
       * *Logic for adding a new workspace
       */
      //       setLabelsMap({
      //   ...labelsMap,
      //   [workspaceInputValue]: workspaceInputValue,
      // });
      //update descriptions map to reflect the new description
      //descriptionsMap[workspaceInputValue] =
      //  descriptionsMap[workspaceInputValue] || "New Workspace Description";

      /**
       * *Logic for renaming the current workspace
       * update labels map to reflect the new label
       */
      setLabelsMap({
        ...labelsMap,
        [selectedOptionValue]: workspaceInputValue,
      });
      inputRef.current.blur(); //lose focus from the input field
      setWorkspaceBtnPressed(false); //set workspaceBtnPressed to false so it doesn't re-render the input field. Part of the logic for conditional rendering of the input field.
    }
  };

  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0];
    setSelectedOption(new Set([selectedKey]));
    setWorkspaceInputValue(labelsMap[selectedKey]);
  };
  return (
    <nav className="absolute z-20  w-1/2 p-4 mt-24 text-white bg-[#1F1F1F] rounded-full cursor-pointer border-[#6366F1] border h-[44px] flex items-center">
      <div className="flex flex-row justify-between w-full">
        <Button
          radius="full"
          className="w-[100px] h-[28px] bg-[#6366F1] text-white focus:outline-none"
        >
          <p>Upload</p>
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
        </Button>
        <ButtonGroup variant="flat">
          {/* /**
           * Dropdown Menu for Workspace Selection.
           ** When the workspace button is clicked, the user can input a workspace name to change the workspace name.
           */}
          <Button
            disableRipple
            disableAnimation
            onPress={handleWorkspaceButtonClick}
            className="w-[180px] h-[26px] border border-[#6366F1] bg-transparent text-white focus:outline-none"
          >
            {/* Conditionally render the input field or the workspace label if the wrokspace button was pressed */}
            {WorkspaceBtnPressed ? (
              <input
                ref={inputRef}
                onKeyDown={handleKeyDown}
                type="text"
                className="w-full h-[22px] text-white bg-transparent border-0 rounded-full focus:outline-none"
                value={workspaceInputValue}
                onChange={handleWorkspaceInputChange}
              />
            ) : (
              <span className="flex items-center w-full h-full">
                {labelsMap[selectedOptionValue]}
              </span>
            )}
          </Button>
          <Dropdown placement="bottom-end" className="bg-[#1F1F1F]">
            <DropdownTrigger>
              <Button
                isIconOnly
                className="h-[26px] border border-[#6366F1] bg-transparent text-white focus:outline-none"
              >
                <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Merge options"
              selectedKeys={selectedOption}
              selectionMode="single"
              onSelectionChange={handleSelectionChange}
              className="max-w-[300px] bg-[#1F1F1F]"
            >
              {Object.keys(labelsMap).map((key) => (
                <DropdownItem key={key} description={descriptionsMap[key]}>
                  {labelsMap[key]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
        <Button
          isIconOnly
          className="w-[29px] h-[29px] focus:outline-none bg-transparent rounded-full border-0"
        >
          <Image
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            className="w-[29px] h-[29px] border-2 rounded-full border-white"
          />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
