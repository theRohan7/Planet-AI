import Logo from '/Logo.svg'
import { CirclePlay } from 'lucide-react';
import { Background, Controls, ReactFlow } from '@xyflow/react';
import './App.css'
import InputNode from './Nodes/InputNode';
import EngineNode from './Nodes/EngineNode';


const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function App() {


  return (
    <main>
      <nav>
        <img src={Logo} alt="Logo" />
        <div className="nav-btns">
          <button className='deploy-btn'>Deploy</button>
          <button className='run-btn'> <CirclePlay/> Run</button>
        </div>
      </nav>
      <section>
      {/* <ReactFlow nodes={initialNodes} edges={initialEdges}   >
        <Controls />
        <Background />
      </ReactFlow > */}
      </section>

    </main>
  )
}

export default App
