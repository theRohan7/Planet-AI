import { FileOutput } from "lucide-react";
import React from "react";
import { useWorkflow } from "../Contexts/Workflow.context";
import "../CSS/InputNode.css";
import { Handle, Position } from "@xyflow/react";

function ResponseNode() {
  const { modelResponse, setModelResponse } = useWorkflow();

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
      <div className="input-node">
        <div className="node-header">
          <h3>
            <FileOutput /> OUTPUT
          </h3>
          <p></p>
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
