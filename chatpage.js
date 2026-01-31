import React, { useState } from "react";
import Navbar from "./Navbar";
import Chat from "./Chat";
import "./ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (msg) => {
    if (!msg) return;
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="chat-page">
      <Navbar username="You" status="online" notifications={3} />
      <Chat messages={messages} sendMessage={sendMessage} username="You" />
    </div>
  );
};

export default ChatPage;
