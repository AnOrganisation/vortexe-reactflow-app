import React from "react";
import CustomAccordion from "../CustomAccordion";
import DownArrowIconWithTail from "./DownArrowIconWithTail";

const WorkflowOutputLabel = ({ label, commands }) => (
  <CustomAccordion
    title={label}
    className="bg-[#6366F1] rounded-md shadow-lg"
    titleClass="text-white font-bold"
    contentClass="bg-gray-50 text-gray-700"
  >
    <div>
      <ul className="flex flex-col items-center justify-center list-disc list-inside">
        {commands.map((command, index) => (
          <React.Fragment key={index}>
            <li className="text-white ">{command}</li>
            {index < commands.length - 1 && (
              <li className="flex justify-center mt-1">
                <DownArrowIconWithTail className="text-white" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  </CustomAccordion>
);

export default WorkflowOutputLabel;
