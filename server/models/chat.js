const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const chatSchema = new Schema(
    {
        users:  [{ type: Schema.Types.ObjectId, default: [], ref: 'User'}],
        lastMessage: { type: Schema.Types.ObjectId, ref: 'Message'}
    },
    {
        timestamps: true,        
    }
);
  
const ChatModel = mongoose.model("Chat", chatSchema);
module.exports = ChatModel;