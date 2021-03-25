const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

const userController = require('../controllers/user-controller');

router.get("/", userController.getUsers);
router.get("/favorites", auth, userController.getFavorites);
router.get("/business", auth, userController.getBusiness);
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.patch("/favorite", auth, userController.updateFavorite);


module.exports = router;