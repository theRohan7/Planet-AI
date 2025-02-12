import React, { useCallback, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  applyEdgeChanges,
  applyNodeChanges
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import InputNode from "../Nodes/InputNode";
import EngineNode from "../Nodes/EngineNode";
import ResponseNode from "../Nodes/ResponseNode";
import { useAppContext } from "../Contexts/AppContext";
import { MessageCircleMore } from "lucide-react";



const getId = (() => {
  let id = 0;
  return () => `dndnode_${id++}`;
})();

const nodeTypes = {
  userInputNode: InputNode,
  modelNode: EngineNode,
  responseNode: ResponseNode,
};


function Canvas() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const { dndType, isDeployed } = useAppContext();

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find(node => node.id === params.source);
      const targetNode = nodes.find(node => node.id === params.target);

      if(!sourceNode || !targetNode) return;

      let isValid = false

      if(sourceNode.type === 'userInputNode' && targetNode.type === 'modelNode' ){
        isValid = params.sourceHandle === 'input-out' && params.targetHandle === 'engine-in';
      } else if (sourceNode.type === 'modelNode' && targetNode.type === 'responseNode') {
        isValid = params.sourceHandle === 'engine-out' && params.targetHandle === 'response-in';
      }

      if (isValid) {
        const edge = {
          ...params,
          type: 'smoothstep', 
          animated: true,
          style: { stroke: '#555', strokeWidth: 2 },
        };
        setEdges((eds) => addEdge(edge, eds));
      }
    },
    [nodes, setEdges]
  );


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!dndType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeTypeMapping = {
        userInput: 'userInputNode',
        model: 'modelNode',
        response: 'responseNode',
      };

      const newId = getId();
      
      // Create initial node data based on type
      const getInitialData = (type) => {
        switch (type) {
          case 'userInputNode':
            return {
              inputText: '',
              label: `${dndType} node`
            };
          case 'modelNode':
            return {
              modelName: '',
              apiBase: '',
              apiKey: '',
              maxTokens: '',
              label: `${dndType} node`
            };
          case 'responseNode':
            return {
              label: `${dndType} node`
            };
          default:
            return { label: `${dndType} node` };
        }
      };

      const nodeType = nodeTypeMapping[dndType];
      const initialData = getInitialData(nodeType);

      setNodes((nds) => [
        ...nds,
        {
          id: newId,
          type: nodeType,
          position,
          data: initialData,
          dragHandle: '.node-header',
        },
      ]);
    },
    [screenToFlowPosition, dndType]
  );

  const handleChat = (e) => {
    e.preventDefault();
    const chatWindow = window.open('/chat', '_blank'); 
    if (chatWindow) {
      chatWindow.focus();
    }
  };

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
          onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
          onConnect={onConnect}
          onDrop={handleDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <button 
         style={{opacity: isDeployed? 1 : 0.5}} 
         disabled={!isDeployed}
         onClick={handleChat}
        >
          < MessageCircleMore style={{width:'2rem', height:'2rem'}}  />
        </button>
      </div>
    </div>
  );
}

export default Canvas;
