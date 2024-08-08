import React from "react";
import { Button } from "@nextui-org/react";

const Workflow = ({ workflowName, actionList, commands, workflowID }) => {
  const handlePress = () => {
    console.log(`Executing workflow: ${workflowName} with id: ${workflowID}`);
    actionList.forEach((action) => {
      console.log(` with action: ${action}`);
      Array.from(commands).map(
        ([key, value]) =>
          key === action ? console.log(`  with prompt: ${value}`) : null // only log prompt if action matches command key
      );
    });
  };
  return (
    <Button
      onPress={handlePress}
      radius="full"
      className="w-[140px] h-[27px] p-2 bg-white text-black focus:outline-none ml-3 hover:bg-[#6366F1] hover:text-white text-sm"
    >
      <div className="relative flex items-center justify-center">
        <p className="absolute">{workflowName}</p>
      </div>
    </Button>
  );
};

export default Workflow;
