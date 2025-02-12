import { FileInput } from "lucide-react";
import React, { useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import "../CSS/InputNode.css";
import { useAppContext } from "../Contexts/AppContext";

function InputNode({ id, data }) {

  

  const { userInput, setUserInput, inputError } = useAppContext();
  const { setNodes } = useReactFlow()


  const handleInputChange = (e) => {
    const newValue  = e.target.value;
    setUserInput(newValue);

    setNodes((nodes) => nodes.map((node) => 
    node.id === id ? {...node, data: {...node.data, inputText: newValue}} : node));
  }

  const displayValue = data?.inputText ?? userInput;


  return (
  
      <div className="input-node" style={{border: inputError ? '2px solid #FF5353' : ''}}>
       <Handle 
        position={Position.Right} 
        style={{width:"0.7rem", height:"0.7rem", marginTop:"7.8rem" }}
        type="source"
        id="input-out" 
        isValidConnection={(connection) => {
          return connection.targetHandle === 'engine-in'
        }}
      />
        <div className="node-header">
          <h3>
            <FileInput /> INPUT
          </h3>
          <p style={{backgroundColor: inputError ? ' #FF5353': ''}}  ></p>
        </div>
        <div className="node-description">
          <p>Write the Input/Question you want to ask</p>
        </div>
        <div className="node-form">
          <h4>Input</h4>
          <input
            type="text"
            placeholder="Type something..."
            value={displayValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="node-footer input-footer">
          <p>LLM Engine</p>
        </div>
      </div>
  );
}

export default InputNode;
