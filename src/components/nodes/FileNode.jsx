import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import PDFIcon from "../../assets/pdf.png";
import PDF from "../../assets/SOLICITATION_RFB-IS-24201409.pdf";

function FileNode({ id, data }) {
  const [isNodeExpanded, setIsNodeExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsNodeExpanded(!isNodeExpanded);
    setShowTooltip(!showTooltip);
  };

  const newFileName =
    data.label.length > 12 ? data.label.substring(0, 12) + ".." : data.label;

  const [showTooltip, setShowTooltip] = useState(
    !(data.label.length - 1 > 12) && !isNodeExpanded
  );

  return (
    <Tooltip
      isDisabled={showTooltip}
      color="foreground"
      delay={1000}
      content={
        <div className="px-1 py-2">
          <div className="font-bold text-white text-small">{data.label}</div>
        </div>
      }
    >
      <Card className="max-w-[1000px] max-h-[1000px] bg-slate-300 bg-opacity-70">
        <CardHeader className="flex gap-3 cursor-pointer">
          <div className="flex-shrink-0">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src={PDFIcon}
              width={40}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-black text-md">
              {isNodeExpanded ? data.label : newFileName}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <p></p>
        {isNodeExpanded ? (
          <CardBody>
            <div className="h-[900px] w-[900px] text-semibold mb-3">
              <iframe
                className="rounded-md"
                src={PDF}
                width="100%"
                height="100%"
              />
            </div>
            <Divider />
            <CardFooter className="flex flex-row justify-between">
              <div></div>
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
                    class="2-6 h-6"
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
                  <div className="font-bold text-white text-small">Expand</div>
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
      </Card>
    </Tooltip>
  );
}

export default FileNode;
