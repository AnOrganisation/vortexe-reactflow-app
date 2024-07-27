import { Button } from "@nextui-org/react";
import React from "react";

const CustomWorkflowBtn = () => {
  return (
    <Button className="w-[155px] h-[27px] p-2 text-white bg-[#6366F1] text-sm ml-2 rounded-full mb-10 mt-3 focus:outline-none">
      <div className="relative flex items-center justify-center">
        <p className="absolute">Custom Workflow +</p>
      </div>
    </Button>
  );
};

export default CustomWorkflowBtn;
