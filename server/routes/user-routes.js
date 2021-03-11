const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.get("/", userController.getUsers);
router.get("/favorites", userController.getFavorites);
router.get("/enterprises", userController.getEnterprises);
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.patch("/favorite", userController.updateFavorite);


module.exports = router;