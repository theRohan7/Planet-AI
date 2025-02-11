import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WorkflowProvider } from "./Contexts/Workflow.context.jsx";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./Contexts/DnDContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReactFlowProvider>
      <DnDProvider>
        <WorkflowProvider>
          <App />
        </WorkflowProvider>
      </DnDProvider>
    </ReactFlowProvider>
  </StrictMode>
);
