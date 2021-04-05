const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const userController = require('../controllers/user-controller');

router.get("/", auth, userController.getUsers);
router.get("/favorites", auth, userController.getFavorites);
router.get("/business", auth, userController.getBusiness);
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.patch("/favorite/:id", auth, userController.updateFavorite);
router.get("/profile/:id", auth, userController.getUserProfile);


module.exports = router;