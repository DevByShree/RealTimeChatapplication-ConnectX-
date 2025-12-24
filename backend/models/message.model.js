import mongoose from "mongoose";

// schema for meaasge 
const messageSchema = new mongoose.Schema({

    senderId:{
        type:mongoose.Schema.Types.ObjectId,     // ObjectId = ID store karta hai
        ref:"User",                              // ref = kis collection ki ID hai
        required:true,
    },
    receiverId:{ 

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
// crete a 2 fileds createAt and updateAt date   it just tell us createdAt → data kab create hua updatedAt → data kab last update hua
},{timestamps: true});



// model

const Message = mongoose.model("Message",messageSchema);

export default Message;