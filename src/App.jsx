import Logo from "/Logo.svg";
import { CirclePlay } from "lucide-react";
import "./App.css";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar.jsx"
import { useReactFlow } from "@xyflow/react";
import { useCallback, useState } from "react";
import { useAppContext } from "./Contexts/AppContext.jsx";
import { validateWorkflow } from "./ustils/workflowValidator.js";
import toast from "react-hot-toast";
import OpenAI from "openai"
import UndeployModel from "./components/UndeployModel.jsx";


function App() {

  const { getNodes, getEdges } = useReactFlow();
  const { 
    setInputError, 
    setModelError, 
    setResponseError,
    setLoading,
    modelDetails, userInput, setModelResponse, isDeployed, setIsDeployed, setInputSucess, setModelSucess, setResponseSucess
  } = useAppContext();  
  const [showModal, setShowModal] = useState(false);

  const generateResponse = async () => {
    try {    


      if (!modelDetails.apiKey || !modelDetails.modelName) {
        throw new Error('Missing required model configuration');
      }

      const client = new OpenAI({
        apiKey: modelDetails.apiKey,
        baseURL:  'https://api.openai.com/v1',
        dangerouslyAllowBrowser: true
      });

      const stream = await client.chat.completions.create({
        model: modelDetails.modelName.toLowerCase(), 
        messages: [{ role: "user", content: userInput }],
        temperature: parseFloat(modelDetails.temperature) || 0.7,
        stream: true,
      });

      setInputSucess(true);
      setModelSucess(true);
      setResponseSucess(true);
      toast.success("Flow ran successfully and ready to be deployed");

      for await (const chunk of stream) {
        const response = chunk.choices[0].delta.content;
        setModelResponse((prevResponse) => prevResponse + response);
      }
      
      
    } catch (error) {
      setResponseError(true);
    toast.error(error.message);
    throw error;
    }
  }

  const handleRun = useCallback(async () => {
    // Reset all errors
    setInputError(false);
    setModelError(false);
    setModelResponse('');
    setResponseError(false);

    const nodes = getNodes();
    const edges = getEdges();

    // Validate workflow
    const { message, node } = validateWorkflow(nodes, edges);
    if (message) {
      if (node) {
        setInputError(node.type === 'userInputNode' ? true : false);
        setModelError(node.type === 'modelNode' ? true : false);
        setResponseError(node.type === 'responseNode' ? true : false);
      } 
      return toast.error(message);
    }

    try {
      setLoading(true);

      await generateResponse();
    } catch (error) {
      console.error('Workflow execution failed:', error);
      setResponseError(true);
    } finally {
      setLoading(false);
    }
  }, [getNodes, getEdges, setInputError, setModelError, modelDetails, setResponseError, setLoading]);

  const handleDeploy = () => {
    if (!isDeployed) {
      setIsDeployed(true);
      toast.success(
        <div className="success-toast">
          <h3>Successfully deployed</h3>
          <p>You can now chat with the AI Assistant.</p>
        </div>
      );
    } else {
      setShowModal(true);
    }
  };

  const handleUndeploy = () => {
    setIsDeployed(false);
    setShowModal(false);
  };

  

  return (
    <main>
      <nav>
        <img src={Logo} alt="Logo" />
        <div className="nav-btns">
        <button
            className="deploy-btn"
            onClick={handleDeploy}
            style={{
              color: isDeployed ? '#FF5353' : '',
              border: isDeployed ? '2px solid #FF5353' : '',
              backgroundColor: isDeployed ? 'white' : ''
            }}
          >
            {isDeployed ? 'Undeploy' : 'Deploy'}
          </button>
          <button className="run-btn" onClick={handleRun}>
            <CirclePlay /> Run
          </button>
        </div>
      </nav>
      <section style={{position: 'relative'}}>
          <Sidebar />
          <Canvas />
      </section>
      <UndeployModel 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUndeploy={handleUndeploy}
      />
    </main>
  );
}

export default App;
