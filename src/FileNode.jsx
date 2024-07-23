import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Handle, Position } from "@xyflow/react";

function FileNode({ id, data }) {
  // FileNode implementation goes here
  return (
    // <div className="filenode">
    //   <h2>{data.label}</h2>
    //   <input type="file" id={id} />
    //   <Handle type="target" position={Position.Left} />
    //   <Handle type="source" position={Position.Right} />
    // </div>
    <Card className="py-4 bg-[#242424] Filecard">
      <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
        <h4 className="font-bold text-white text-large">{data.label}</h4>
      </CardHeader>
      <CardBody className="py-2 overflow-visible">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </Card>
  );
}

export default FileNode;
