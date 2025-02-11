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


function App() {

  const { getNodes, getEdges } = useReactFlow();
  const { 
    setInputError, 
    setModelError, 
    setResponseError,
    setLoading,
  } = useAppContext();

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
