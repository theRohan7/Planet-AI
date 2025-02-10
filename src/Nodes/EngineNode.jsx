import React, { useState } from 'react'
import '../CSS/InputNode.css'
import { useWorkflow } from '../Contexts/Workflow.context'
import { Cpu } from 'lucide-react';

function EngineNode() {

 const {modelDetails, setModelDetails } = useWorkflow();

 const handleModelChange =() => {}

 const handleChange = () => {}

 const handleTempChange = () => {}
 

  return (
    <div className='input-node'>
        <div className="node-header">
            <h3><Cpu /> LLM ENGINE</h3>
            <p></p>
        </div>
        <div className="node-description">
            <p>Lorem ipsum sic dola amet</p>
        </div>
        <div className="engine-node-form">
            <label htmlFor="modelName">Model Name</label>
            <input type="text" value={modelDetails.modelName} placeholder='Type something...' onChange={handleModelChange}   />
            <label htmlFor="apiBase">OpenAI API Base</label>
            <input type="text" id='apiBase' placeholder='Type something...' value={modelDetails.apiBase} onChange={handleChange} />
            <label htmlFor="apiKey">OpenAI Key</label>
            <input type="text" id='apiKey' placeholder='Type something...' value={modelDetails.apiKey} onChange={handleChange} />
            <label htmlFor="maxToken">Max Tokens</label>
            <input type="text" id='maxToken' placeholder='Type something...' value={modelDetails.maxTokens} onChange={handleChange} />
            <label htmlFor="temp">Temperature</label>
            <input type="number" id='temp' placeholder='Type something...' value={modelDetails.temperature} onChange={handleTempChange} />
        </div>
        <div className="node-footer">
            <span>Input</span>
            <p>LLM Engine</p>
        </div>
      
    </div>
  )
}

export default EngineNode;
