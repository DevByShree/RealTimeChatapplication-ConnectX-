import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log(" SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log(" SOCKET ERROR:", err.message);
});

export default socket;
