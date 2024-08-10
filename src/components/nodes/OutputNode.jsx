import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Tooltip,
  Textarea,
  Badge,
  Button,
} from "@nextui-org/react";
import { Handle, Position } from "@xyflow/react";
import { useState, useRef } from "react";
import "../../style.css";

function OutputNode({ id, data }) {
  const [isNodeExpanded, setIsNodeExpanded] = useState(false);
  const textareaRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alert

  const handleExpandClick = () => {
    setIsNodeExpanded(!isNodeExpanded);
  };

  // Prevent dragging when interacting with the Textarea
  const preventDrag = (e) => {
    e.stopPropagation();
  };

  const handleCopyClick = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      navigator.clipboard.writeText(textarea.value).then(
        () => {
          setShowAlert(true); // Show alert on successful copy
          setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
        },
        (err) => {
          console.error("Failed to copy to clipboard:", err);
        }
      );
    }
  };

  return (
    <>
      {showAlert && (
        <div className="fixed z-30 p-2 text-white bg-green-500 rounded-lg shadow-lg bottom-5 right-16">
          Copied to clipboard
        </div>
      )}
      <Badge
        showOutline="false"
        content={`${data.label}`}
        size="sm"
        color="secondary"
      >
        <Card
          className={`max-w-[1000px] max-h-[1000px] min-w-[224px] min-h-16 bg-slate-300 bg-opacity-70 ${
            data.isNodeActive
              ? "border-3 border-blue-500 border-opacity-100"
              : ""
          }`}
        >
          <CardHeader className="flex flex-row justify-between cursor-pointer">
            <div className="flex-shrink-0">
              <p className="font-semibold">{`Result`}</p>
            </div>
          </CardHeader>
          <Divider />
          <p></p>
          {isNodeExpanded ? (
            <CardBody>
              <div className="max-h-[900px] max-w-[900px] min-w-96 text-semibold mb-3">
                {/* Textarea content here */}
                <Textarea
                  ref={textareaRef}
                  isReadOnly
                  variant="bordered"
                  label="Content"
                  labelPlacement="outside"
                  defaultValue={data.value}
                  className="w-full h-full overflow-y-auto text-black custom-scrollbar"
                  onMouseDown={preventDrag} // Prevent dragging on mousedown
                  onWheel={preventDrag} // Prevent zooming on scroll
                />
              </div>
              <Divider />
              <CardFooter className="flex flex-row justify-between">
                <div>
                  <Button
                    size="sm"
                    className="text-md bg-[#6366F1] text-white focus:outline-none w-[60px] h-[28px]"
                    onPress={handleCopyClick}
                  >
                    Copy
                  </Button>
                </div>
                <Tooltip
                  placement="right"
                  color="foreground"
                  delay={1000}
                  content={
                    <div className="px-1 py-2">
                      <div className="font-bold text-white text-small">
                        Collapse
                      </div>
                    </div>
                  }
                >
                  <span
                    className="h-6 border-none rounded-md cursor-pointer opacity-70 hover:opacity-100 focus:outline-none"
                    onClick={handleExpandClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 2-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                      />
                    </svg>
                  </span>
                </Tooltip>
              </CardFooter>
            </CardBody>
          ) : (
            <CardFooter className="flex flex-row justify-between">
              <div></div>
              <Tooltip
                placement="right"
                color="foreground"
                delay={1000}
                content={
                  <div className="px-1 py-2">
                    <div className="font-bold text-white text-small">
                      Expand
                    </div>
                  </div>
                }
              >
                <span
                  className="h-6 border-none rounded-md cursor-pointer opacity-70 hover:opacity-100 focus:outline-none"
                  onClick={handleExpandClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                  </svg>
                </span>
              </Tooltip>
            </CardFooter>
          )}
          <Handle type="target" position={Position.Left} />
        </Card>
      </Badge>
    </>
  );
}

export default OutputNode;
