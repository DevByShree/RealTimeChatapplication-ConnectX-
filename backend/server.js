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
const PORT = process.env.PORT || 5000;

//  Create HTTP server
const server = http.createServer(app);

//  Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  },
});

//  Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

// ================= SOCKET.IO LOGIC =================
io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  socket.on("sendMessage", (message) => {
    console.log(" Message received:", message);
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });
});

//  Start server
server.listen(PORT, () => {
  connectTOMongoDB();
  console.log(` Server running on port ${PORT}`);
});
