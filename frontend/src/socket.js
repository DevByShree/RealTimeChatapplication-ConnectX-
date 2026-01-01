import { io } from "socket.io-client";

const socket = io("http://192.168.0.100:5000", {
  withCredentials: true,
});

export default socket;
