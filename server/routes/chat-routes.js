const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const chatController = require('../controllers/chat-controller');

router.get('/', auth, chatController.getChatList); 
router.get('/:userId', auth, chatController.getSingleChat);
router.get('/messages/unread', auth, chatController.getUnreadCountByChat); 
router.get('/messages/:chatId', auth, chatController.getMessages);
router.put('/message/read/:messageId', auth, chatController.updateReadStatus);
router.post('/message/', auth, chatController.createsMessage); 



module.exports = router;