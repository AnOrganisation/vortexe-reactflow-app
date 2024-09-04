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
  Button,
  Chip,
  Badge,
} from "@nextui-org/react";
import { Handle, Position } from "@xyflow/react";

const TriggerableActionNode = ({ id, data }) => {
  return (
    <>
      <div className="nodrag">
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
};

export default TriggerableActionNode;
