
export const validateWorkflow = (nodes, edges) => {
  
    const  nodeTypes = nodes.map(node => node.type)
    const requiredTypes = ['userInputNode', 'modelNode', 'responseNode'];

    const missingNodes = requiredTypes.filter(type => !nodeTypes.includes(type));
    if(missingNodes.length > 0) {
       return {
            message: `Missing required nodes: ${missingNodes.join(', ')}`,
            node: null}
    }

   if(edges.length === 0) {
    return {
      message: `connnection between nodes is missing`,
      node: null
    }
   }
   const connetcedToModel = edges.some(edge => edge.sourceHandle === 'input-out' && edge.targetHandle === 'engine-in');
   const connetcedToResponse = edges.some(edge => edge.sourceHandle === 'engine-out' && edge.targetHandle === 'response-in');

   if(!connetcedToModel) return {
    message: `Missing connection between user input node and model node`,
    node: null}

   if(!connetcedToResponse) return {
    message: `Missing connection between model node and response node`,
    node: null}
  
    for (const node of nodes) {
      switch (node.type) {
        case 'userInputNode':
          if (!node.data?.inputText?.trim()) {
            console.log(node);
            return {
              message: 'User input node is missing input text',
              node: node
            };
          }
          break;
  
        case 'modelNode':
          const requiredModelFields = ['modelName', 'apiBase', 'apiKey', 'maxTokens'];
          for (const field of requiredModelFields) {
            if (!node.data?.[field]?.trim()) {
              return {
                message: `Model node is missing ${field}`,
                node: node
              };
            }
          }
          break;
      }
    }
  
    // If all validations pass, return success
    return {
      message: null,
      node: null
    };
}