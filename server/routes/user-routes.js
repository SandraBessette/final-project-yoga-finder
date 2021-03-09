const express = require('express');
const router = express.Router();

const { updateFavorite, getUsers, getFavorites, signin, signup } = require('../controllers/user-controller');

router.get("/", getUsers);
router.get("/favorites", getFavorites);
router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/favorite", updateFavorite);


module.exports = router;