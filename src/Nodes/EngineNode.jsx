import React, { useState } from "react";
import "../CSS/InputNode.css";
import { useWorkflow } from "../Contexts/Workflow.context";
import { ChevronDown, Cpu } from "lucide-react";
import { Handle, Position } from "@xyflow/react";

function EngineNode() {
  const { modelDetails, setModelDetails } = useWorkflow();
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isTempDropdownOpen, setIsTempDropdownOpen] = useState(false);

  console.log(
    modelDetails
  );
  

  const modelOptions = ["GPT-4", "GPT-4o", "GPT-4o mini"];
  const temperatureOptions = ["0.0", "0.5", "1.0"];

  const handleModelChange = (selectedModel) => {
    setModelDetails(prev => ({
      ...prev,
      modelName: selectedModel
    }));
    setIsModelDropdownOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setModelDetails(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleTempChange = (selectedTemp) => {
    setModelDetails(prev => ({
      ...prev,
      temperature: selectedTemp
    }));
    setIsTempDropdownOpen(false);
  };

  return (
    <>
    <Handle 
     position={Position.Left} 
     style={{width:"0.7rem", height:"0.7rem", marginTop:"16.7rem"}} 
     type="target"
     id="engine-in"
     isValidConnection={(connection) => {
      return connection.sourceHandle === 'input-out'
     }}
    />
    <Handle 
     position={Position.Right} 
     style={{width:"0.7rem", height:"0.7rem", marginTop:"16.7rem"}} 
     type="source"
     id="engine-out"
     isValidConnection={(connection) => {
      return connection.targetHandle === 'response-in'
     }}
    />
      <div className="input-node">
        <div className="node-header">
          <h3>
            <Cpu /> LLM ENGINE
          </h3>
          <p></p>
        </div>
        <div className="node-description">
          <p>Lorem ipsum sic dola amet</p>
        </div>
        <div className="engine-node-form">
          <label htmlFor="modelName">Model Name</label>
          <div className="custom-dropdown">
            <div 
              className="dropdown-header"
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            >
              <span>{modelDetails.modelName || "Select model..."}</span>
              <ChevronDown size={16} />
            </div>
            {isModelDropdownOpen && (
              <div className="dropdown-options">
                {modelOptions.map((option) => (
                  <div
                    key={option}
                    className="dropdown-item"
                    onClick={() => handleModelChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <label htmlFor="apiBase">OpenAI API Base</label>
          <input
            type="text"
            id="apiBase"
            placeholder="Type something..."
            value={modelDetails.apiBase}
            onChange={handleChange}
          />
          <label htmlFor="apiKey">OpenAI Key</label>
          <input
            type="text"
            id="apiKey"
            placeholder="Type something..."
            value={modelDetails.apiKey}
            onChange={handleChange}
          />
          <label htmlFor="maxToken">Max Tokens</label>
          <input
            type="number"
            id="maxTokens"
            placeholder="Type something..."
            value={modelDetails.maxTokens}
            onChange={handleChange}
          />
          <label htmlFor="temp">Temperature</label>
          <div className="custom-dropdown">
            <div 
              className="dropdown-header"
              onClick={() => setIsTempDropdownOpen(!isTempDropdownOpen)}
            >
              <span>{modelDetails.temperature || "Select temperature..."}</span>
              <ChevronDown size={16} />
            </div>
            {isTempDropdownOpen && (
              <div className="dropdown-options">
                {temperatureOptions.map((option) => (
                  <div
                    key={option}
                    className="dropdown-item"
                    onClick={() => handleTempChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="node-footer">
          <span>Input</span>
          <p>Output</p>
        </div>
      </div>
    </>
  );
}

export default EngineNode;
