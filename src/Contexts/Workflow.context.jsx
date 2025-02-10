import { createContext, useContext, useState } from "react";

const WorkflowContext = createContext();4
export const useWorkflow = () => useContext(WorkflowContext)


export const WorkflowProvider = ({ children }) => {

    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [modelDetails, setModelDetails] = useState({
        modelName: '',
        apiBase: '',
        apiKey: '',
        maxTokens: '',
        temperature: 0.5

    })
    const [modelResponse, setModelResponse] = useState('');
  



  return (
    <WorkflowContext.Provider value={{ userInput, setUserInput, loading, setLoading, modelDetails, setModelDetails, modelResponse, setModelResponse  }}>
        {children}
    </WorkflowContext.Provider>
  );
};
