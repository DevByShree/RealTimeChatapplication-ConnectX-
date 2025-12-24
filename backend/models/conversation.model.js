import mongoose from "mongoose";


// schema

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    }],

}, { timestamps: true }

);

// model
const Conversation = new mongoose.model("Conversation", conversationSchema);

export default Conversation;