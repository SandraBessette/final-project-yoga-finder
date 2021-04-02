const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const messageSchema = new Schema(
    {
        chatId: { type: Schema.Types.ObjectId, ref: 'Chat'},
        message: String,
        sender: {type: Schema.Types.ObjectId, require: true, ref: 'User'},
        receiver: {type: Schema.Types.ObjectId, require: true, ref: 'User'},
        read: {type: Boolean, default: false},
        delivered: {type: Boolean, default: false}               
    }, 
    {
        timestamps: true,        
    }
);
  
const MessageModel = mongoose.model("Message", messageSchema);
module.exports = MessageModel;