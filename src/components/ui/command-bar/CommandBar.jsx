import React, { useState, useEffect, useCallback, useRef } from "react";
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
  // State to track the search query
  const [searchQuery, setSearchQuery] = useState("");
  const commandBarRef = useRef(null);

  /**
   ** Fetch basic actions from the backend when the component mounts.
   *  Updates the commands state with the fetched basic actions.
   */
  const fetchBasicActions = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.vortexeai.com/workflow/v1/get_basic_actions",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Basic actions fetched successfully: ", response.data);
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
        `https://api.vortexeai.com/workflow/v1/action/list?user_id=${userID}`,
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
              user_id: userID,
              name: action.action_name,
              description: action.description,
              action_id: action.action_id,
              prompt: action.prompt,
              action_type: action.action_type,
              model_configuration: {
                model_configuration: "string",
              },
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
              user_id: userID,
              name: action.action_name,
              description: action.description,
              action_id: action.action_id,
              prompt: action.prompt,
              action_type: action.action_type,
              model_configuration: {
                model_configuration: "string",
              },
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
            `https://api.vortexeai.com/workflow/v1/action/save`,
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
      // console.log("Filtered commands: ", Array.from(filtered));
      setFilteredCommands(filtered); // set filtered commands
    }
  }, [searchQuery, commands]);

  const isNodeAdditionMode = showForNodeAddition && newNodeData;
  // console.log("Filetered commands: ", Array.from(filteredCommands));

  // Adjust the style based on newNodeData.screenPosition
  const commandBarStyle = {
    position: "absolute",
    zIndex: 20,
    width: "192px", // Adjust as needed
    maxHeight: "screen", // Adjust as needed
    backgroundColor: "white",
    borderRadius: "8px",
    border: "1px solid #6366F1",
    cursor: "pointer",
    left: isNodeAdditionMode ? `${newNodeData.screenPosition.x}px` : "5px",
    top: isNodeAdditionMode
      ? `${newNodeData.screenPosition.y - 150}px`
      : "28px",
    display: "flex",
  };

  return (
    <div
      ref={commandBarRef}
      style={commandBarStyle}
      className="command-bar"
    >
      <input
        type="text"
        className="w-[148px] h-[14px] p-3 mb-4 text-black border-1 border-[#999999] rounded-full outline-none mt-5 bg-white bg-opacity-20 text-xs"
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
                (
                  [
                    key,
                    {
                      user_id,
                      name,
                      description,
                      action_id,
                      prompt,
                      action_type,
                      model_configuration,
                    },
                  ],
                  index
                ) => (
                  <ListboxItem
                    key={index}
                    showDivider
                    description={description}
                    textValue="actions"
                  >
                    <Command
                      key={index}
                      userID={user_id}
                      actionID={action_id}
                      actionName={name}
                      prompt={prompt}
                      actionType={action_type}
                      description={description}
                      modelConfiguration={model_configuration}
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
