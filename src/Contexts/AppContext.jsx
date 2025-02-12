import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelDetails, setModelDetails] = useState({
    modelName: '',
    apiBase: '',
    apiKey: '',
    maxTokens: '',
    temperature: 0.5,
  });
  const [modelResponse, setModelResponse] = useState('');
  const [dndType, setDnDType] = useState(null);
  const [inputError, setInputError]  = useState(false)
  const [modelError, setModelError]  = useState(false)
  const [responseError, setResponseError]  = useState(false)
  const [isDeployed, setIsDeployed]  = useState(false)
  const [inputSucess, setInputSucess]  = useState(false)
  const [modelSucess, setModelSucess]  = useState(false)
  const [responseSucess, setResponseSucess]  = useState(false)
  return (
    <AppContext.Provider value={{
      userInput, setUserInput, loading, setLoading,
      modelDetails, setModelDetails, modelResponse, setModelResponse,
      dndType, setDnDType, inputError, setInputError, modelError, setModelError, setResponseError, responseError,
      isDeployed, setIsDeployed, inputSucess,modelSucess, responseSucess,setInputSucess, setModelSucess, setResponseSucess
    }}>
      {children}
    </AppContext.Provider>
  );
};