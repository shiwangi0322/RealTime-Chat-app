import React from "react";
import "./Message.css";

const Message = ({ msg }) => {
  const isYou = msg.sender === "You";

  return (
    <div className={`message-row ${isYou ? "you" : "other"}`}>
      <div className={`message-bubble ${isYou ? "sent" : "received"}`}>
        {!isYou && <div className="sender-name">{msg.sender}</div>}
        <div className="message-text">{msg.text}</div>
        <div className="message-footer">
          <span className="time">{msg.timestamp}</span>
          {isYou && <span className="status">✓✓</span>}
        </div>
      </div>
    </div>
  );
};

export default Message;
