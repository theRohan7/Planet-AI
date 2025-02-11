import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ReactFlowProvider } from "@xyflow/react";
import { AppProvider } from "./Contexts/AppContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <ReactFlowProvider>
      <AppProvider>

          <App />
      </AppProvider>
    </ReactFlowProvider>
  </StrictMode>
);
