// StyleButton.jsx
import React from "react";

const StyleButton = ({ onToggle, style, active, label }) => {
  const className = active
    ? "mr-2 px-2 py-1 cursor-pointer border border-gray-300 rounded bg-gray-300"
    : "mr-2 px-2 py-1 cursor-pointer border border-gray-300 rounded";

  return (
    <span
      className={className}
      onMouseDown={(e) => {
        e.preventDefault();
        onToggle(style);
      }}
    >
      {label}
    </span>
  );
};

export default StyleButton;
