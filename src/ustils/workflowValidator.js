
export const validateWorkflow = (nodes, edges) => {
   

    const  nodeTypes = nodes.map(node => node.type)
    const requiredTypes = ['userInputNode', 'modelNode', 'responseNode'];

    const missingNodes = requiredTypes.filter(type => !nodeTypes.includes(type));
    if(missingNodes.length > 0) {
       return {
            message: `Missing required nodes: ${missingNodes.join(', ')}`,
            node: null}
    }

    const connections = new Map();
    for (const edge of edges) {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);

        
        connections.set(sourceNode.id, targetNode.id);
    }
  
    // Validate connection flow
    const inputNodes = nodes.filter(n => n.type === 'userInputNode');
    const modelNodes = nodes.filter(n => n.type === 'modelNode');
    const responseNodes = nodes.filter(n => n.type === 'responseNode');
  
    // Check if input nodes are connected to model nodes
    inputNodes.forEach(inputNode => {
      const connectedToModel = Array.from(connections.entries())
        .some(([source, target]) => 
          source === inputNode.id && 
          nodes.find(n => n.id === target)?.type === 'modelNode'
        );
      
      if (!connectedToModel) {
        return {
          message: `Input node must be connected to a model node`,
          node: inputNode};
      }
    });
  
    // Check if model nodes are connected to response nodes
    modelNodes.forEach(modelNode => {
      const connectedToResponse = Array.from(connections.entries())
        .some(([source, target]) => 
          source === modelNode.id && 
          nodes.find(n => n.id === target)?.type === 'responseNode'
        );
      
      if (!connectedToResponse) {
        return {
          message: `Model node must be connected to a response node`,
          node: modelNode};
      }
    });
  
    // Validate individual node data
    nodes.forEach(node => {
      switch (node.type) {
        case 'userInputNode':
          if (!node.data?.inputText?.trim()) {
            return {
              message: `User input node is missing input text`,
              node: node};
          }
          break;
        case 'modelNode':
          const requiredModelFields = ['modelName', 'apiBase', 'apiKey', 'maxTokens'];
          requiredModelFields.forEach(field => {
            if (!node.data?.[field]?.trim()) {
              return {
                message: `Model node is missing ${field}`,
                node: node};
            }
          });
          break;
      }
    });
}