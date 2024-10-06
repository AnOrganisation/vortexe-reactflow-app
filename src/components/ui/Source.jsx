import React from "react";
import { Image } from "@nextui-org/react";

const InputSource = ({ source, selectedSource, setSelectedSource }) => {
  return (
    <div className="flex items-center justify-center w-full max-h-screen">
      <div
        onClick={() => {
          console.log("Selected source:", source.name);
          setSelectedSource(source.name);
        }}
        className={`flex items-center justify-start- p-3 rounded-lg mb-3 w-1/2 cursor-pointer hover:transition-all ${
          selectedSource === source.name
            ? "bg-[#707070]"
            : "bg-[#4d4d4d4d] hover:bg-[#6366f1]"
        }`}
      >
        {typeof source.logo === "string" ? (
          <Image width={35} height={20} src={source.logo} alt="input source" />
        ) : (
          <source.logo /> // Render as a component if it's an SVG or React component
        )}
        <p className="ml-3">{source.name}</p>
      </div>
    </div>
  );
};

export default InputSource;
