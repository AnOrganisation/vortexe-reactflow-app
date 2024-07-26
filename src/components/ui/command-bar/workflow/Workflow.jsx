import React from "react";
import { Button } from "@nextui-org/react";

const Workflow = ({ workflow }) => {
  return (
    <Button
      radius="full"
      className="w-[140px] h-[27px] p-2 bg-white text-black focus:outline-none ml-3 hover:bg-[#6366F1] hover:text-white text-sm"
    >
      <div className="relative flex items-center justify-center">
        <p className="absolute">{workflow}</p>
      </div>
    </Button>
  );
};

export default Workflow;
