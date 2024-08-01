import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Handle, Position } from "@xyflow/react";

function FileNode({ id, data }) {
  // FileNode implementation goes here

  const [isNodeExpanded, setIsNodeExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsNodeExpanded(!isNodeExpanded);
    //console.log(`Expanding node: ${id} expanded: ${isNodeExpanded}`);
  };

  return (
    <Card className="max-w-[150px] max-h-[250px] bg-slate-300 nodrag">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-black text-md">{data.label}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter className="flex flex-row justify-between">
        <p></p>
        {isNodeExpanded ? (
          <CardBody></CardBody>
        ) : (
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
        )}
      </CardFooter>
    </Card>
  );
}

export default FileNode;
