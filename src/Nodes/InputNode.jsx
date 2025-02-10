import { FileInput } from 'lucide-react'
import React, { useState } from 'react'
import '../CSS/InputNode.css'
import { useWorkflow } from '../Contexts/Workflow.context'

function InputNode() {

 const { userInput, setUserInput } = useWorkflow();
 

  return (
    <div className='input-node'>
        <div className="node-header">
            <h3><FileInput /> INPUT</h3>
            <p></p>
        </div>
        <div className="node-description">
            <p>Write the Input/Question you want to ask</p>
        </div>
        <div className="node-form">
            <h4>Input</h4>
            <input type="text" placeholder='Type something...' value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        </div>
        <div className="node-footer">
            <p>LLM Engine</p>
        </div>
      
    </div>
  )
}

export default InputNode
