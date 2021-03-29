const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const commentController = require('../controllers/comment-controller');

router.get("/business/:id", commentController.getBusinessComments);
router.get("/user/:id", auth, commentController.getUserComments);
router.post("/:businessId", auth, commentController.createComment);


module.exports = router;