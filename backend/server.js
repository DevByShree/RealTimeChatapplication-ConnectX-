//packages import 
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";

// routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.routes.js";

// database 
import connectTOMongoDB from "./db/connectToMongoDB.js";
const app = express();
const PORT = process.env.PORT || 5000;

// middleware 

app.use(cookieParser());
app.use(express.json());    // this is help for the incomming data forom user name and  pass and etc from req.body
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/users", userRoutes)


// app.get("/", (req, res) => {
//     // http://localhost:5000/
//     res.send("Ha bhai you can ")
// });



app.listen(PORT, () => {
    connectTOMongoDB(process.env.MONGO_URL);
    console.log(`Server is running on port${PORT}`)
})