import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";

export const sendmessage = async (req,res)=>{
    try {
        const {message}= req.body;
        const {id:receiverid} = req.params;
        const senderid = req.user._id

        let conversation = await Conversation.findOne({
            participants: {$all:[senderid,receiverid]}
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderid,receiverid],
            })
        }

        const newmessage = new Message({
            senderid,
            receiverid,
            messages:message,
        })

        if(newmessage){
            conversation.messages.push(newmessage._id)
        }

        await newmessage.save()
        await conversation.save()
        res.status(200).json(newmessage)

    } catch (error) {
        console.log("Error occurred in message.controller inside send message", error);
        return res.status(500).json({ error: "An error occurred while sending a message" });
    }
}

export const getmessages = async (req,res)=>{
    try {
        const {id:receiverid} = req.params
        const senderid = req.user._id

        const conversation = await Conversation.findOne({
            participants: {$all:[senderid,receiverid]}
        }).populate("messages")  // populate is used because we are storing the message id rather than a message this maps the messageid to the message
 
        if(!conversation){
            res.status(401).json([])  // if no conversation is found between the sender and the receiver empty list is returned
        }

        res.status(200).json(conversation.messages)



    } catch (error) {
        console.log("Error occurred in message.controller inside get messages", error);
        return res.status(500).json({ error: "An error occurred while sending a message" });
    }
}