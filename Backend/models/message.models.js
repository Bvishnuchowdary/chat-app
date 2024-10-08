import mongoose from 'mongoose'

const messageschema = new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    receiverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    messages:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Message = mongoose.model("Message",messageschema);

export default Message