// InlineStyleControls.jsx

import React from "react";
import StyleButton from "./StyleButton";

const INLINE_STYLES = [
  { label: "B", style: "BOLD" },
  { label: "I", style: "ITALIC" },
  { label: "U", style: "UNDERLINE" },
];

const InlineStyleControls = ({ editorState, onToggle, theme }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="flex mb-2 select-none">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
