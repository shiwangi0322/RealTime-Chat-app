import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import "./Chat.css";

const Chat = ({ messages, sendMessage, username }) => {
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [status, setStatus] = useState("Connecting...");

  // Scroll to bottom when new message comes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // WebSocket connection
  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080");

    socketRef.current.onopen = () => setStatus("Online");

    socketRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      sendMessage(msg);
    };

    socketRef.current.onerror = () => setStatus("Error");

    socketRef.current.onclose = () => {
      setStatus("Reconnecting...");
      setTimeout(() => {
        socketRef.current = new WebSocket("ws://localhost:8080");
      }, 3000);
    };

    return () => socketRef.current?.close();
  }, [sendMessage]);

  const handleSend = (text) => {
    if (!text || socketRef.current.readyState !== 1) return;

    const msg = {
      text,
      sender: username,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    socketRef.current.send(JSON.stringify(msg));
    sendMessage(msg);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span>💬 Chat Room</span>
        <span className={`status ${status.toLowerCase()}`}>● {status}</span>
      </div>

      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
