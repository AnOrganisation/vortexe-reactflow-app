import { useCallback, useState } from "react";
import { Handle, Position } from "@xyflow/react";

function FileNode({ id, data }) {
  // FileNode implementation goes here
  return (
    <div className="filenode">
      <h2>{data.label}</h2>
      <input type="file" id={id} />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default FileNode;
