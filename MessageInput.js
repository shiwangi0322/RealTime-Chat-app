import React, { useState, useRef } from "react";
import "./MessageInput.css";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const addEmoji = (emoji) => {
    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;
    const newText = text.substring(0, start) + emoji + text.substring(end);
    setText(newText);
    inputRef.current.focus();
    inputRef.current.selectionStart = inputRef.current.selectionEnd = start + emoji.length;
  };

  return (
    <div className="message-input">
      <div className="input-row">
        <textarea
          ref={inputRef}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
        />
        <button onClick={handleSend} disabled={!text.trim()}>Send</button>
      </div>
      <div className="extra-features">
        <button onClick={() => addEmoji("😊")}>😊</button>
        <button onClick={() => addEmoji("👍")}>👍</button>
        <button onClick={() => addEmoji("🎉")}>🎉</button>
      </div>
    </div>
  );
};

export default MessageInput;
