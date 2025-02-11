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
import { useDnD } from "../Contexts/DnDContext";



let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  userInputNode: InputNode,
  modelNode: EngineNode,
  responseNode: ResponseNode,
};

const defaultEdgeOptions = {
  animated: true,
  style: {
    stroke: '#555',
    strokeWidth: 2,
  },
};

const initialNodes = [];
const initialEdges = [];

function Canvas() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

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

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, [setNodes]);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const nodeTypeMapping = {
        userInput: 'userInputNode',
        model: 'modelNode',
        response: 'responseNode'
      };
      const newNode = {
        id: getId(),
        type: nodeTypeMapping[type], 
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => [...(nds || []), newNode]);
    },
    [screenToFlowPosition, type]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          defaultEdgeOptions={defaultEdgeOptions}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Canvas;
