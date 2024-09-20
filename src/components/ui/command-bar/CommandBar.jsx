import React, { useState, useEffect, useCallback } from "react";
import Command from "./action/Command";

import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from "./action/ListboxWrapper";

import CustomActionBtn from "./action/CustomActionBtn";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

/**
 * CommandBar component renders a UI element that allows users to interact with a list of commands.
 * It includes a search input, buttons to toggle between "Commands" and "Workflows", and a list of command buttons.
 *
 * @returns {JSX.Element} The rendered CommandBar component.
 */
const CommandBar = ({
  activeFileContent,
  activeNodeID,
  fileNodes,
  setFileNodes,
  setFileEdges,
  setAlert,
  setAlertMessage,
  setAlertType,
  userID,
  showForNodeAddition,
  onCommandSelected,
  newNodeData,
}) => {
  // State to store the filtered commands
  const [filteredCommands, setFilteredCommands] = useState(new Map([]));

  const [commands, setCommands] = useState(new Map([]));
  // State to track which button is active, default is 'Commands'
  const [activeButton, setActiveButton] = useState("Commands");
  // State to track the search query
  const [searchQuery, setSearchQuery] = useState("");

  /**
   ** Fetch basic actions from the backend when the component mounts.
   *  Updates the commands state with the fetched basic actions.
   */

  const fetchBasicActions = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8003/v1/get_basic_actions",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Basic actions fetched successfully: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Basic actions fetch failed:", error);
    }
  }, []);

  /**
   * * Get custom actions from the backend and update the commands state
   */
  const getCustomActions = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8003/v1/action/list?user_id=${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Custom actions fetched successfully: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Custom actions fetch failed:", error);
      return [];
    }
  }, [userID]);
  //************************************************************************** */

  const fetchAndSetActions = async () => {
    try {
      const [basicActions, customActions] = await Promise.all([
        fetchBasicActions(),
        getCustomActions(),
      ]);

      if (basicActions) {
        setCommands((prevCommands) => {
          const newCommands = new Map(prevCommands);
          basicActions.forEach((action) => {
            newCommands.set(action.action_id, {
              name: action.action_name,
              description: action.description,
            });
          });
          return newCommands;
        });
      }

      if (customActions && customActions.length > 0) {
        setCommands((prevCommands) => {
          const newCommands = new Map(prevCommands);
          customActions.forEach((action) => {
            newCommands.set(action.action_id, {
              name: action.action_name,
              description: action.description,
            });
          });
          return newCommands;
        });
      }
    } catch (error) {
      console.error("Failed to fetch actions:", error);
    }
  };

  /**
   * * Save custom actions to the backend when the custom action component unmounts.
   *  Updates the commands state with the saved custom actions.
   */
  const saveCustomActions = useCallback(
    async (customAction) => {
      if (customAction) {
        try {
          const response = await axios.post(
            `http://127.0.0.1:8003/v1/action/save`,
            customAction,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Custom action saved successfully: ", response.data);
        } catch (error) {
          console.error("Custom actions save failed:", error);
        }
        fetchAndSetActions();
      }
    },
    [getCustomActions, userID]
  );
  //************************************************************************** */

  useEffect(() => {
    fetchAndSetActions();
  }, [fetchBasicActions, getCustomActions, userID]);

  //************************************************************************** */

  // Filter logic that won't modify the original `commands` state
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredCommands(commands); // reset to all commands if query is empty
    } else {
      const filtered = new Map(
        Array.from(commands).filter(
          ([key, { name, description }]) =>
            name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredCommands(filtered); // set filtered commands
    }
  }, [searchQuery, commands]);

  const isNodeAdditionMode = showForNodeAddition && newNodeData;

  // Adjust the style based on newNodeData.screenPosition
  const commandBarStyle = {
    position: "absolute",
    zIndex: 20,
    width: "200px", // Adjust as needed
    maxHeight: "screen", // Adjust as needed
    backgroundColor: "#1F1F1F",
    borderRadius: "8px",
    border: "1px solid #6366F1",
    cursor: "pointer",
    left: isNodeAdditionMode ? `${newNodeData.screenPosition.x}px` : "5px",
    top: isNodeAdditionMode ? `${newNodeData.screenPosition.y}px` : "28px",
    display: "block",
  };

  return (
    <div
      style={commandBarStyle}
      className="absolute z-20 w-48 max-h-screen text-white rounded-lg shadow-lg cursor-pointer bg-[#1F1F1F] left-5 top-28 flex flex-col items-center border border-[#6366F1]"
    >
      <input
        type="text"
        className="w-[148px] h-[14px] p-3 mb-4 text-white border-none rounded-full outline-none mt-5 bg-[#3837376f] bg-opacity-40 text-xs"
        placeholder="Search an action"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="w-[90%] mb-3 flex flex-col">
        <CustomActionBtn userID={userID} onSave={saveCustomActions} />
        <div className="mb-3 space-y-2 max-h-96">
          <ListboxWrapper>
            <Listbox
              aria-label="Listbox Variants"
              color="default"
              variant="solid"
              className="overflow-y-auto border-0 max-h-96 custom-scrollbar"
            >
              {Array.from(filteredCommands).map(
                ([key, { name, description }], index) => (
                  <ListboxItem
                    key={index}
                    showDivider
                    description={description}
                    textValue="actions"
                  >
                    <Command
                      key={index}
                      commandName={name}
                      prompt={commands.get(key).prompt}
                      commandID={`commandBar-` + uuidv4()}
                      activeFileContent={activeFileContent}
                      activeNodeID={activeNodeID}
                      fileNodes={fileNodes}
                      setFileNodes={setFileNodes}
                      setFileEdges={setFileEdges}
                      setAlert={setAlert}
                      setAlertMessage={setAlertMessage}
                      setAlertType={setAlertType}
                      onCommandSelected={onCommandSelected}
                    />
                  </ListboxItem>
                )
              )}
            </Listbox>
          </ListboxWrapper>
        </div>
      </div>
    </div>
  );
};

export default CommandBar;
