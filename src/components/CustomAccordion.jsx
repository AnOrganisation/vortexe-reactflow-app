// CustomAccordion.jsx
import React, { useState, useRef, useEffect } from "react";

const CustomAccordion = ({
  title,
  children,
  className = "",
  titleClass = "",
  contentClass = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    setMaxHeight(isOpen ? "0px" : `${contentRef.current.scrollHeight}px`);
  };

  useEffect(() => {
    if (isOpen) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className={`border-0 rounded ${className}`}>
      <div
        onClick={toggleAccordion}
        className={`cursor-pointer p-4 flex justify-between items-center ${titleClass}`}
      >
        <span className="mr-2">{title}</span>
        <svg
          className={`w-5 h-5 transition-transform transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          transition: "max-height 0.3s ease-in-out",
        }}
        className={`overflow-hidden ${contentClass}`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomAccordion;
