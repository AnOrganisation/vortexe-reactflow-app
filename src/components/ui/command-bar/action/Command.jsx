import React from "react";
import { Button } from "@nextui-org/react";
const Command = ({ commandName, prompt }) => {
  const handlePress = () => {
    console.log(`Executing command: ${commandName} with prompt: ${prompt}`);
  };
  return (
    <Button
      onPress={handlePress}
      radius="full"
      className="w-[140px] h-[27px] p-2 bg-white text-black focus:outline-none ml-3 hover:bg-[#6366F1] hover:text-white text-sm"
    >
      <div className="relative flex items-center justify-center">
        <p className="absolute">{commandName}</p>
      </div>
    </Button>
  );
};

export default Command;
