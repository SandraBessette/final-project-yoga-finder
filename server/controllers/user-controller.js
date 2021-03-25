const mongoose = require('mongoose');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const BusinessModel = require('../models/business');


const getUsers = async (req, res) => { 
  try {
    const result = await UserModel.find(); 
    if(result)
      res.status(200).json({ status: 200, message: "success", data: result });
    else
      res.status(400).json({ status: 400,  message: "something went wrong"});
  } catch (error) {
    res.status(500).json({ status: 500, error: error?.message});
    
    console.log(error);
  }


};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) 
      return res.status(404).json({ status: 404, message: "User doesn't exist", data: email });

    const isPasswordOk = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordOk)
      return res.status(400).json({ status: 400, message: "Invalid credentials", data: req.body });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(201).json({ status: 201, message: "success", data: oldUser, token });
  } catch (error) {
    res.status(500).json({ status: 500, error: error?.message, message: "Something went wrong" });
    console.log(error?.message);
  };
}

const signup = async (req, res) => {
  const { email, userName, type, password, image} = req.body;  

  try {
    let oldUser = await UserModel.findOne({ userName });
    if (oldUser) return res.status(400).json({ status: 400, message: "User already exists with this userName", data: userName});
    

    oldUser = await UserModel.findOne({ email });
    if (oldUser) return res.status(400).json({  status: 400, message:"User already exists with this email", data: email });
 
    const hashedPassword = await bcrypt.hash(password, 12);   
    const result = await UserModel.create({ userName, email, type, image, password: hashedPassword});

    const token = jwt.sign( { email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN } );

    res.status(201).json({ status: 201, message: "success", data: result, token });
  } catch (error) {
    res.status(500).json({ status: 500, error: error?.message, message: "something went wrong"});
    
    console.log(error?.message);
  }
};

const updateFavorite = async (req, res) => {
  const businessId = req.body._id; 
 
 // const id = "604806c1fd383244749bdc91"; //temporary, will recuperate that from the token

  const id = req.userId; 
  if (!id) {
      return res.status(400).json({ status: 400, message: "The user is not authenticated", data: req.body });
  }

  if (!mongoose.Types.ObjectId.isValid(businessId))
    return res.status(404).json({ status: 404, message: `No business with id: ${id}` });   

  try {  
    const user = await UserModel.findOne({ _id: id }) ;
    if (!user)
      return res.status(404).json({ status: 404, message: `User not found` , data: req.body}); 

    const index = user.favorites.findIndex((id) => id.toString() === businessId);   
    if (index === -1) {
      user.favorites.push(businessId);
      await BusinessModel.updateOne({ _id: businessId }, { $inc: { favoriteTotal: 1 } }); 
    } else {
      user.favorites = user.favorites.filter((id) => id.toString() !== businessId);
      await BusinessModel.updateOne({ _id: businessId }, { $inc: { favoriteTotal: -1 } });      
    }
 
    const result = await user.save();    
    res.status(200).json({ status: 200, message: "success", data: result.favorites });  
 
  } catch (error) {
    res.status(500).json({ status: 500, error: error?.message, message: "something went wrong"});    
    console.log(error?.message);
  }


};

const getFavorites = async (req, res) => {
  //const id = "604806c1fd383244749bdc91"; //temporary, will recuperate that from the token
  const id = req.userId; 
  if (!id) {
      return res.status(400).json({ status: 400, message: "The user is not authenticated" });
  }

  try {
    const result = await UserModel.findOne({ _id: id }).populate('favorites').exec(); 
    if(result)
      res.status(200).json({ status: 200, message: "success", data: result.favorites });
    else
      res.status(404).json({ status: 404,  message: "user not found"});
  } catch (error) {
    res.status(500).json({ status: 500, error: error?.message});    
   console.log(error);
  }
};

const getBusiness = async (req, res) =>{
 // const id = "6046b5958f1dc73f986be1d0"; //temporary, will recuperate that from the token
 const id = req.userId; 
  if (!id) {
      return res.status(400).json({ status: 400, message: "The user is not authenticated" });
  }

  try {
    const result = await BusinessModel.find({ userId: id });
    if(result)
      res.status(200).json({ status: 200, message: "success", data: result });
    else
      res.status(404).json({ status: 404,  message: "Business for this user not found"});
  } catch (error) {
    res.status(500).json({ status: 500, error: error?.message});    
   console.log(error);
  }
}

module.exports = { 
  getUsers, 
  signin,
  signup,
  updateFavorite,
  getFavorites,
  getBusiness
};