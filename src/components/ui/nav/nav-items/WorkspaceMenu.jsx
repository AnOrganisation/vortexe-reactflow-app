import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@nextui-org/react";
import { ChevronDownIcon } from "./ChevronDownIcon";
/**
 * WorkspaceMenu component renders a dropdown menu with available workspaces.
 * It also includes a search input and a button to toggle the dropdown menu.
 */
const WorkspaceMenu = () => {
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
    <ButtonGroup variant="flat">
      {/* /**
       * Dropdown Menu for Workspace Selection.
       ** When the workspace button is clicked, the user can input a workspace name to change the workspace name.
       */}
      <Tooltip
        placement="left"
        color="Secondary"
        content="CLICK to Edit, ENTER to Save"
        className="bg-[#6366F1] text-white"
      >
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
      </Tooltip>
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
  );
};

export default WorkspaceMenu;
