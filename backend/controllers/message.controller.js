import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// MESSAGE BOX 
export const sendMessage = async (req, res) => {


    try {
        const { message } = req.body;   // get  message form user 
        const { id: receiverId } = req.params;  // and also get the reciverid 
        const senderId = req.user._id;           // sender id amd we use here middleware also


        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
            //                   find between these conversation if exist then go next 
        })
        // if not exist conversation between sender and receiver so follow this and create the nnew coneverastion with the hewlp of create
        if (!conversation) {

            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]);


        res.status(201).json(newMessage);
    }

    catch (error) {
        console.log("Error in message controller ", error.message)
        res.status(500).json({ error: "Inter server error" })
    }
};



/// CONVERSATION BOX 
export const getMessage = async (req, res) => {

    try {

        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages")  // populate id to message 

        if(!conversation){
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.messages);

    }
    catch (error) {
        console.log("Error in getmessage controller ", error.message)
        res.status(500).json({ error: "Inter server error" })
    }
}