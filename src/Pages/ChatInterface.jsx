import Logo from "/Logo.svg";
import { useState } from 'react';
import OpenAI from 'openai';
import { Send, MessageCircle } from 'lucide-react';
import { useChatContext } from '../Contexts/ChatContext';
import '../CSS/chatInterface.css';
import { toast } from 'react-hot-toast';

function ChatInterface() {
  const { messages, addMessage, modelDetails } = useChatContext();

  const [inputMessage, setInputMessage] = useState('');

  console.log(modelDetails);
  

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', content: inputMessage };
    addMessage(userMessage);
    setInputMessage('');

    try {
      if (!modelDetails.apiKey || !modelDetails.modelName) {
        throw new Error('Model configuration is missing.');
      }

      const client = new OpenAI({
        apiKey: modelDetails.apiKey,
        baseURL: 'https://api.openai.com/v1',
        dangerouslyAllowBrowser: true,
      });

      const contextMessages = [...messages, userMessage].slice(-6); // Limit to 6 messages

      const response = await client.chat.completions.create({
        model: modelDetails.modelName.toLowerCase(),
        messages: contextMessages,
        temperature: parseFloat(modelDetails.temperature) || 0.7,
      });

      const botReply = {
        role: 'assistant',
        content: response.choices[0].message.content,
      };
      addMessage(botReply);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={Logo} alt="OpenAI" className="logo" />
        </div>

        <button className="new-chat-btn" onClick={() => window.location.reload()}>
          + Start new chat
        </button>

        <div className="chat-history-label">CHAT HISTORY</div>
        <div className="chat-history-list">
          {messages.slice(0, 4).map((msg, index) => (
            <div key={index} className="chat-history-item">
              <MessageCircle size={16} />
              <span>{msg.content.substring(0, 20)}...</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <span>✍️</span> AI Assistant
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-avatar">
                {message.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Write your message"
            className="chat-input"
          />
          <button type="submit" className="send-button">
            <Send color="white" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;