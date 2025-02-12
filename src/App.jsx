import Logo from "/Logo.svg";
import { CirclePlay } from "lucide-react";
import "./App.css";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar.jsx"
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useAppContext } from "./Contexts/AppContext.jsx";
import { validateWorkflow } from "./ustils/workflowValidator.js";
import toast from "react-hot-toast";
import OpenAI from "openai"


function App() {

  const { getNodes, getEdges } = useReactFlow();
  const { 
    setInputError, 
    setModelError, 
    setResponseError,
    setLoading,
    modelDetails, userInput, setModelResponse
  } = useAppContext();



  console.log(modelDetails);
  

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
  }, [getNodes, getEdges, setInputError, setModelError, setResponseError, setLoading]);


  

  return (
    <main>
      <nav>
        <img src={Logo} alt="Logo" />
        <div className="nav-btns">
          <button className="deploy-btn">Deploy</button>
          <button className="run-btn" onClick={handleRun}>
            <CirclePlay /> Run
          </button>
        </div>
      </nav>
      <section>
          <Sidebar />
          <Canvas />
      </section>
    </main>
  );
}

export default App;
