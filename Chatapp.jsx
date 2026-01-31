import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import "./ChatApp.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "incoming",
      text: "Hello! How are you?",
      time: "10:00 AM",
      read: true,
      avatar: "https://i.pravatar.cc/40?img=1",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Handle sending outgoing messages
  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      type: "outgoing",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };

    setMessages([...messages, newMsg]);
    setInput("");
    setTyping(true);

    // Simulate incoming reply after a short delay
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        type: "incoming",
        text: generateReply(input),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70) + 1}`,
        read: true,
      };

      setTyping(false);
      setMessages((prev) => [...prev, reply]);
    }, 1500); // 1.5s typing indicator
  };

  // Simple reply generator (just for demo)
  const generateReply = (text) => {
    const replies = [
      "That's interesting!",
      "I see 😄",
      "Tell me more!",
      "Exactly!",
      "Oh, really?",
      `You said: "${text}"`,
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

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
                {msg.type === "outgoing" && <span className="read">{msg.read ? "✔✔" : "✔"}</span>}
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
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
