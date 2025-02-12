import React, { useEffect, useState } from "react";
import "../CSS/InputNode.css";
import { ChevronDown, Cpu } from "lucide-react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { useAppContext } from "../Contexts/AppContext";

function EngineNode({ id, data }) {
  const { modelDetails, setModelDetails, modelError} = useAppContext();
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isTempDropdownOpen, setIsTempDropdownOpen] = useState(false);
  const {setNodes} = useReactFlow()
  

  const modelOptions = [
    "gpt-4",
    "gpt-4-turbo-preview",
    "gpt-3.5-turbo"
  ];
  
  const temperatureOptions = ["0.0", "0.5", "1.0"];


  const updateNodeAndContext = async (updates) => {
    try {
  
      setModelDetails(prev => ({
        ...prev,
        ...updates
      }));

      setNodes(nodes =>
        nodes.map(node =>
          node.id === id ? { ...node, data: { ...node.data, ...updates }} : node
        )
      );

    } catch (error) {
      console.error("Error updating node:", error);
    }
  };

  const handleModelChange = (selectedModel) => {
    updateNodeAndContext({
      modelName: selectedModel,
      apiBase: 'https://api.openai.com/v1'
    });
    setIsModelDropdownOpen(false);
  };  

  const handleChange = (e) => {
    const { id: fieldId, value } = e.target;
    updateNodeAndContext({ [fieldId]: value });
  };

  const handleTempChange = (selectedTemp) => {
    const tempValue = parseFloat(selectedTemp);
    updateNodeAndContext({ temperature: tempValue });
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
      <div className="input-node "  style={{border: modelError ? '2px solid #FF5353' : ''}}>
        <div className="node-header">
          <h3>
            <Cpu /> LLM ENGINE
          </h3>
          <p style={{backgroundColor: modelError ? ' #FF5353' : ''}} ></p>
        </div>
        <div className="node-description">
          <p>Lorem ipsum sic dola amet</p>
        </div>
        <div className="engine-node-form">
          <label htmlFor="modelName">Model Name</label>
          <div className="custom-dropdown">
            <div 
              className="dropdown-header"
              onClick={() =>setIsModelDropdownOpen(!isModelDropdownOpen)}
            >
              <span>{data?.modelName || "Select model..."}</span>
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
            value={data?.apiBase}
            onChange={handleChange}
          />
          <label htmlFor="apiKey">OpenAI Key</label>
          <input
            type="password"
            id="apiKey"
            placeholder="Type something..."
            value={data?.apiKey}
            onChange={handleChange}
          />
          <label htmlFor="maxToken">Max Tokens</label>
          <input
            type="number"
            id="maxTokens"
            placeholder="Type something..."
            value={data?.maxTokens}
            onChange={handleChange}
          />
          <label htmlFor="temp">Temperature</label>
          <div className="custom-dropdown">
            <div 
              className="dropdown-header"
              onClick={() =>setIsTempDropdownOpen(!isTempDropdownOpen)}
            >
              <span>{data?.temperature || "Select temperature..."}</span>
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
