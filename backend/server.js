import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectTOMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = 5000;

//  HTTP server
const server = http.createServer(app);

//  Allowed frontend origin
const allowedOrigins = ["http://localhost:3000"];

//  Middlewares
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// 🔹 Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

//  Socket.IO server
export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(" Socket connected:", socket.id);

  //  User joins his own room (userId)
  socket.on("joinRoom", (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(" Joined room:", userId);
    }
  });

  //  Send message ONLY to receiver
  socket.on("sendMessage", (msg) => {
    const receiverId = msg.receiverId;

    if (receiverId) {
      io.to(receiverId).emit("receiveMessage", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log(" Socket disconnected:", socket.id);
  });
});

//  Start server
server.listen(PORT, () => {
  connectTOMongoDB();
  console.log(` Backend running on http://localhost:${PORT}`);
});
