// src/components/ChatApp.jsx
import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import "./ChatApp.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: "incoming", text: "Hello! How are you?", time: "10:00 AM", read: true, avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 2, type: "outgoing", text: "I'm good, thanks! And you?", time: "10:01 AM", read: true },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      type: "outgoing",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setMessages([...messages, newMsg]);
    setInput("");
    setTyping(false);
  };

  useEffect(() => {
    // Scroll to bottom on new message
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="chat-app">
      <nav className="chat-navbar">
        <h2>Chat App</h2>
      </nav>

      <div className="chat-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            {msg.type === "incoming" && <Avatar src={msg.avatar} alt="avatar" />}
            <div className="message-content">
              <p>{msg.text}</p>
              <div className="message-info">
                <span className="time">{msg.time}</span>
                {msg.type === "outgoing" && (
                  <span className="read">{msg.read ? "✔✔" : "✔"}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="message incoming typing-indicator">
            <Avatar src="https://i.pravatar.cc/40?img=2" alt="avatar" />
            <div className="message-content">
              <p>Typing...</p>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setTyping(e.target.value.length > 0);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
