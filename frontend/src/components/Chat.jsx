import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MessageContainer from "../components/MessageContainer";
import "./Chat.css";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log(" selectedUser changed:", selectedUser);
  }, [selectedUser]);

  return (
    <div className="chat-layout">
      <Sidebar setSelectedUser={setSelectedUser} />
      <MessageContainer selectedUser={selectedUser} />
    </div>
  );
};

export default Chat;
