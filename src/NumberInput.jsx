import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

/**
 * NumberInput is a React component that renders a number input field with a label.
 * It allows the user to input a number between 0 and 255, and updates the node data accordingly.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The unique identifier for the node.
 * @param {Object} props.data - The data object containing the initial value and label for the input.
 * @param {number} props.data.value - The initial value for the number input.
 * @param {string} props.data.label - The label to be displayed above the number input.
 * @returns {JSX.Element} The rendered number input component.
 */
function NumberInput({ id, data }) {
  const { updateNodeData } = useReactFlow();
  /**
   ** When dealing with input fields you don't want to use a nodes data object as UI state directly.
   **There is a delay in updating the data object and the cursor might jump around erraticly and lead to unwanted inputs.
   */
  const [number, setNumber] = useState(data.value);

  const onChange = useCallback((evt) => {
    const cappedNumber = Math.min(255, Math.max(0, evt.target.value));
    setNumber(cappedNumber);
    updateNodeData(id, { value: cappedNumber });
  }, []);

  return (
    <div className="number-input">
      <div>{data.label}</div>
      <input
        id={`number-${id}`}
        name="number"
        type="number"
        min="0"
        max="255"
        onChange={onChange}
        className="nodrag"
        value={number}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default NumberInput;
