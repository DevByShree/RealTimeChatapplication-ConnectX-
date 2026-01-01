import React from "react";
import "./MessageContainer.css";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

const MessageContainer = ({ selectedUser }) => {
  const navigate = useNavigate();

  if (!selectedUser) {
    return (
      <div className="msgfullbox empty">
        <div className="welcome-title">Welcome to ConnectX</div>
        <div className="welcome-subtitle">
          Select a conversation to start chatting
        </div>
      </div>
    );
  }

  return (
    <div className="msgfullbox">
      <div className="header">
        <button
          className="back-btn"
          onClick={() => navigate("/chat")}
        >
          ←
        </button>

        <span className="emptytxt">To:</span>
        <span className="nameRaze">
          {selectedUser.username || selectedUser.name}
        </span>
      </div>

      <Message selectedUser={selectedUser} />
    </div>
  );
};

export default MessageContainer;
