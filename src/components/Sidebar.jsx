import React from 'react'
import { useDnD } from '../Contexts/DnDContext'
import { Cpu, FileInput, FileOutput, Menu } from 'lucide-react'
import '../CSS/Sidebar.css'

function Sidebar() {
    const [_, setType] = useDnD()

    const onDragStart = (event, nodeType) => {
      setType(nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };

  return (
    <aside>
       <h3>Components</h3>

       <p>Drag and Drop</p>

       <div className='dndnode'  onDragStart={(event) => onDragStart(event, 'userInput')} draggable>
         <p><FileInput color='black' style={{marginRight:'0.5rem'}} /> Input</p>
         <Menu color='#9EAC8F'  />
       </div>
       <div className='dndnode' onDragStart={(event) => onDragStart(event, 'model')} draggable>
         <p><Cpu color='black' style={{marginRight:'0.5rem'}} /> LLM Engine</p>
         <Menu color='#9EAC8F' />
       </div>
       <div className='dndnode' onDragStart={(event) => onDragStart(event, 'response')} draggable>
         <p><FileOutput  color='black' style={{marginRight:'0.5rem'}}/> Output</p>
         <Menu color='#9EAC8F' />
       </div>
    </aside>
  )
}

export default Sidebar
