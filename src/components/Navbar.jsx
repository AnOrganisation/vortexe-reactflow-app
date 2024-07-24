import React from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { ChevronDownIcon } from "./ChevronDownIcon";

const Navbar = () => {
  const [selectedOption, setSelectedOption] = React.useState(
    new Set(["Workspace1"])
  );

  const descriptionsMap = {
    Workspace1: "Your Default Workspace.",
    Workspace2: "Workspace for ARTG-180",
    Workspace3: "A brand new workspace just for you",
  };

  const labelsMap = {
    Workspace1: "My Workspace 1",
    Workspace2: "Art Workspace",
    Workspace3: "New Workspace",
  };

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0];

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
          <Button className="w-[180px] h-[26px] border border-[#6366F1] bg-transparent text-white focus:outline-none">
            {labelsMap[selectedOptionValue]}
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
              onSelectionChange={setSelectedOption}
              className="max-w-[300px] bg-[#1F1F1F]"
            >
              <DropdownItem
                key="Workspace1"
                description={descriptionsMap["Workspace1"]}
              >
                {labelsMap["Workspace1"]}
              </DropdownItem>
              <DropdownItem
                key="Workspace2"
                description={descriptionsMap["Workspace2"]}
              >
                {labelsMap["Workspace2"]}
              </DropdownItem>
              <DropdownItem
                key="Workspace3"
                description={descriptionsMap["Workspace3"]}
              >
                {labelsMap["Workspace3"]}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
        <Avatar
          isBordered
          color="primary"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          className="w-[29px] h-[29px]"
        />
      </div>
    </nav>
  );
};

export default Navbar;
