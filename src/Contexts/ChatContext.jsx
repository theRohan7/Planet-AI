import { createContext, useContext, useState } from 'react';
import { useAppContext } from './AppContext';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const {modelDetails} = useAppContext()
    
  const [messages, setMessages] = useState([]); // Manage messages here

  const addMessage = (message) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];
      return updatedMessages.length > 6
        ? updatedMessages.slice(-6) // Keep only the latest 6 messages
        : updatedMessages;
    });
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, modelDetails }}>
      {children}
    </ChatContext.Provider>
  );
};
