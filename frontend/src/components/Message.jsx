import React, { useEffect, useState, useRef } from "react";
import "./Message.css";
import socket from "../socket";

const Message = ({ selectedUser }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const receiverId = selectedUser?._id;

  // 🔹 Join socket room (VERY IMPORTANT)
  useEffect(() => {
    if (receiverId) {
      socket.emit("joinRoom", receiverId);
    }
  }, [receiverId]);

  // 🔹 Load old messages
  useEffect(() => {
    if (!receiverId) return;

    fetch(`/api/message/${receiverId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.log(err));
  }, [receiverId]);

  // 🔹 Receive real-time message
  useEffect(() => {
    if (!receiverId) return;

    const handleReceiveMessage = (newMsg) => {
      if (
        newMsg.senderId === receiverId ||
        newMsg.receiverId === receiverId
      ) {
        setMessages((prev) => [...prev, newMsg]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [receiverId]);

  // 🔹 Send message
  const sendMessage = async () => {
    if (!input.trim() || !receiverId) return;

    try {
      const res = await fetch(`/api/message/send/${receiverId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message: input }),
      });

      const savedMessage = await res.json();

      // emit to socket
      socket.emit("sendMessage", {
        ...savedMessage,
        receiverId,
      });

      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-main">
      <div className="chat-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`msg-row ${
              msg.senderId === receiverId ? "left" : "right"
            }`}
          >
            <div className="msg-bubble">{msg.message}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default Message;
