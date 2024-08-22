import {
  Handle,
  Position,
  useNodesData,
  useHandleConnections,
} from "@xyflow/react";

function ColorPreview() {
  /**
   *start by determining all connections for each handle with the useHandleConnections hook
   *and then fetching the data for the first connected node with updateNodeData
   **useHandleConnections: returns an array of connections on a specific handle or handle type, each with a source node id
   **useNodesData: returns the data object for a specific node id, if it exists in the nodes
   */
  const redConnections = useHandleConnections({
    type: "target",
    id: "red",
  });
  const redNodeData = useNodesData(redConnections?.[0].source);

  const greenConnections = useHandleConnections({
    type: "target",
    id: "green",
  });
  const greenNodeData = useNodesData(greenConnections?.[0].source);

  const blueConnections = useHandleConnections({
    type: "target",
    id: "blue",
  });
  const blueNodeData = useNodesData(blueConnections?.[0].source);

  const color = {
    r: redNodeData?.data ? redNodeData.data.value : 0,
    g: greenNodeData?.data ? greenNodeData.data.value : 0,
    b: blueNodeData?.data ? blueNodeData.data.value : 0,
  };

  return (
    <div
      className="node"
      style={{
        background: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
    >
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="red"
          className="handle"
        />
        <label htmlFor="red" className="label">
          R
        </label>
      </div>
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="green"
          className="handle"
        />
        <label htmlFor="green" className="label">
          G
        </label>
      </div>
      <div>
        <Handle
          type="target"
          position={Position.Left}
          id="blue"
          className="handle"
        />
        <label htmlFor="red" className="label">
          B
        </label>
      </div>
    </div>
  );
}

export default ColorPreview;
