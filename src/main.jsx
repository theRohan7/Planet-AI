import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ReactFlowProvider } from "@xyflow/react";
import { AppProvider } from "./Contexts/AppContext.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatInterface from "./Pages/ChatInterface.jsx";
import { ChatProvider } from "./Contexts/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: " #0FA958",
            color: "white",
          },
        },
        error: {
          style: {
            background: "#FF5353",
            color: "white",
          },
        },
      }}
    />
    <BrowserRouter>
      <ReactFlowProvider>
        <AppProvider>
        <ChatProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/chat" element={<ChatInterface />} />
            </Routes>
        </ChatProvider>
        </AppProvider>
      </ReactFlowProvider>
    </BrowserRouter>
  </StrictMode>
);
