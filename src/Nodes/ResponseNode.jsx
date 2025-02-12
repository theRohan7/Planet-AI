import { FileOutput } from "lucide-react";
import React from "react";
import "../CSS/InputNode.css";
import { Handle, Position } from "@xyflow/react";
import { useAppContext } from "../Contexts/AppContext";

function ResponseNode() {
  const { modelResponse, setModelResponse, responseError, responseSucess } = useAppContext();

  return (
    <>
    <Handle 
     position={Position.Left} 
     style={{width:"0.7rem", height:"0.7rem", marginTop:'11rem'}} 
     type="target"
     id="response-in"
     isValidConnection={(connection) => {
      return connection.sourceHandle === "engine-out"
     }}
    />
      <div className="input-node" style={{border: responseError ? '2px solid #FF5353' : ''}}>
        <div className="node-header">
          <h3>
            <FileOutput /> OUTPUT
          </h3>
          <p style={{backgroundColor: responseError ? ' #FF5353': responseSucess ? '#0FA958' : ''}} ></p>
        </div>
        <div className="node-description">
          <p>Lorem ipsum sic dolar amet</p>
        </div>
        <div className="node-form">
          <h4>Output Response</h4>
          <textarea
            readOnly
            placeholder="Output response will be shown here"
            value={modelResponse}
          />
        </div>
        <div className="node-footer">
          <p>LLM Engine</p>
        </div>
      </div>
    </>
  );
}

export default ResponseNode;
