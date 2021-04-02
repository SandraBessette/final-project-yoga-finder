const mongoose = require('mongoose'); 
const ChatModel = require('../models/chat');
const MessageModel = require('../models/message');
const UserModel = require('../models/user');


const getChatList = async (req, res) => {
    const userId = req.userId; 

    if (!userId) {
        return res.status(401).json({ status: 401, message: "The user is not authenticated" });
      }   
      
    try {
        const result = await ChatModel.find(({ users: { "$in" : [userId]} }))
                                        .sort({ updatedAt: 1 })
                                        .limit(20)
                                        .populate('lastMessage')
                                        .populate('users')
                                        .exec();    
    
      if (result){   
       
          res.status(200).json({ status: 200, message: "success", data: result });
      }        
      else
        res.status(404).json({ status: 404,  message: "chat list not found"});
    } catch (error) {
        res.status(500).json({ status: 500, message: error?.message});    
        console.log(error?.message);
    }
  };

  const getSingleChat = async (req, res) => {
    const user2 = req.params.userId; 
    const userId = req.userId; 
    if (!userId) {
        return res.status(401).json({ status: 401, message: "The user is not authenticated" });
      }   
      
    try {

        const otherUser = await UserModel.findOne({ _id: user2 });    
        if (otherUser) { 
            
            const chat = await ChatModel.findOne({ users: { "$all" : [userId, user2]} });               
            res.status(200).json({ status: 200, message: "success", data: {user: otherUser, chat }});  
        }
           
        else {        
            res.status(404).json({ status: 404, message: `No user with id: ${user2}` }); 
        }       
      
    } catch (error) {
        res.status(500).json({ status: 500, message: error?.message});    
        console.log(error?.message);
    }
  };

  const getMessages = async (req, res) => {
    const { chatId } = req.params; 

    const userId = req.userId;     
    if (!userId) {
        return res.status(401).json({ status: 401, message: "The user is not authenticated" });
      }   
      
    try {
        const result = await MessageModel.find(({ chatId }))
                                                .sort({ createdAt: 1 })
                                                .populate('sender')                                               
                                                .exec();    
    
      if (result)
        res.status(200).json({ status: 200, message: "success", data: result });
      else
        res.status(404).json({ status: 404,  message: "messages list not found"});
    } catch (error) {
        res.status(500).json({ status: 500, message: error?.message});    
        console.log(error?.message);
    }
  }

  const createsMessage = async (req, res) => {
    const {  
        receiverId,  
        message  
        } = req.body;

    const userId = req.userId;     
    if (!userId) {
        return res.status(401).json({ status: 401, message: "The user is not authenticated", data: req.body });
      }

            
    try {
        const receiver = await UserModel.findOne({ _id: receiverId }) ;
        if (!receiver)
            return res.status(404).json({ status: 404, message: `Receiver not found`, data: req.body}); 

        const chat = await ChatModel.findOne({ users: { "$all" : [userId, receiverId]} });              
        console.log("chat", chat);
        if (chat){       
            const result = await MessageModel.create({ chatId: chat._id, message, sender: userId, receiver: receiverId });
            if (result){
                chat.lastMessage = result._id;
                await chat.exec();
                res.status(201).json({ status: 201, message: "success", data: {chat, message: result }});
            }                
        }
        else{
            let newChat = new ChatModel({ users: [userId, receiverId] });
            let newMessage = new MessageModel({ chatId: newChat._id, message, sender: userId, receiver: receiverId });
            newChat.lastMessage = newMessage._id;

            newChat = await newChat.save();
            newMessage = await newMessage.save();
            res.status(201).json({ status: 201, message: "success", data: {chat: newChat, message: newMessage } });
        }   
    } catch (error) {
        res.status(500).json({ status: 500, message: error?.message, data: req.body});    
        console.log(error?.message);
    }
};


const updateReadStatus = async (req, res) => {
    const { messageId } = req.params; 

    const userId = req.userId;     
    if (!userId) {
        return res.status(401).json({ status: 401, message: "The user is not authenticated"});
      }   
      
    try {
        const result = await MessageModel.findByIdAndUpdate(messageId, {read: true }, { new: true });        
        if (result)
            res.status(201).json({ status: 201, message: "success", data: result }); 
        else  
            res.status(404).json({ status: 404, message: `No message with id: ${messageId}` });
    } catch (error) {
        res.status(500).json({ status: 500, message: error?.message});    
        console.log(error?.message);
    }
}

const getUnreadCountByChat = async (req, res) => {
    const userId = req.userId;     
    if (!userId) {
        return res.status(401).json({ status: 401, message: "The user is not authenticated" });
      }

    try {
    const result = await MessageModel.aggregate([
        {
        $match:{
            receiver: userId,
            read: false
        }},
        {
       $group: {
            _id: '$chatId',
            count: { $sum: 1 }
        }}
    ]);

    if (result){
        let count = {};
        result.forEach((item)=>{
            count[item._id] = item.count;
        });

        res.status(200).json({ status: 200, message: "success", data: count });
    }       
      else
        res.status(404).json({ status: 404,  message: "messages unread count list not found"});
    } catch (error) {
        res.status(500).json({ status: 500, message: error?.message});    
        console.log(error?.message);
    }
}


  module.exports = { 
    getChatList,
    getMessages,
    getSingleChat,
    createsMessage,    
    updateReadStatus,
    getUnreadCountByChat     
  };