const mongoose = require('mongoose');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const BusinessModel = require('../models/business');


const getUsers = async (req, res) => { 
  const { search } = req.query; 
  const userid = req.userId;

  if (!userid) {
      return res.status(401).json({ status: 401, message: "The user is not authenticated" });
  }

  try {
    let result = null;  
    if (search){
        result = await UserModel.find({ userName: { $regex: search, $options: 'i' } },  { userName: 1, image: 1 }).sort({ userName: 1 }).limit(9);
    }else {
        result = await UserModel.find({}, { userName: 1, image: 1 } ).sort({ userName: 1 }); 
      }
    if(result)
      res.status(200).json({ status: 200, message: "success", data: result });
    else
      res.status(400).json({ status: 400,  message: "something went wrong"});
  } catch (error) {
    res.status(500).json({ status: 500, error: error?.message});
    
    console.log(error);
  }
};

const getUserProfile = async (req, res) => { 
  const { id } = req.params;  
 
  const userid = req.userId;

  if (!userid) {
      return res.status(401).json({ status: 401, message: "The user is not authenticated" });
  }
    
  if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ status: 404, message: `No user with id: ${id}` }); 
      
  try {   
      const result = await UserModel.findOne({ _id: id });    
      if (result) {     
          res.status(200).json({ status: 200, message: "success", data: {userName: result.userName, email: result.email, image: result.image} });  
      }
           
      else {        
          res.status(404).json({ status: 404, message: `No user with id: ${id}` }); 
      } 
            
  }
  catch (error) {
      console.log("500", error.message);
      res.status(500).json({ status: 500, message: error?.message });   
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
      return res.status(401).json({ status: 401, message: "Invalid credentials", data: req.body });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.status(201).json({ status: 201, message: "success", data: {_id: oldUser._id, userName: oldUser.userName, image: oldUser.image, type: oldUser.type, favorites: oldUser.favorites} , token });
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

    res.status(201).json({ status: 201, message: "success", data: {_id: result._id, userName: result.userName, image: result.image, type: result.type, favorites: result.favorites}, token });
  } catch (error) {
    res.status(500).json({ status: 500, error: error?.message, message: "something went wrong"});
    
    console.log(error?.message);
  }
};

const updateFavorite = async (req, res) => {

  const businessId = req.params.id;

  const id = req.userId; 
  if (!id) {
      return res.status(401).json({ status: 401, message: "The user is not authenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(businessId))
    return res.status(404).json({ status: 404, message: `No business with id: ${id}` });   

  try {  
    const user = await UserModel.findOne({ _id: id }) ;
    if (!user)
      return res.status(404).json({ status: 404, message: `User not found` }); 

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

  const id = req.userId; 
  if (!id) {
      return res.status(401).json({ status: 401, message: "The user is not authenticated" });
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

 const id = req.userId; 
  if (!id) {
      return res.status(401).json({ status: 401, message: "The user is not authenticated" });
  }

  try {
    const result = await BusinessModel.find({ userId: id });
    if(result)
      res.status(200).json({ status: 200, message: "success", data: result });
    else
      res.status(404).json({ status: 404,  message: "Business for this user not found"});
  } catch (error) {
    res.status(500).json({ status: 500, message: error?.message});    
   console.log(erro.message);
  }
}

module.exports = { 
  getUsers, 
  getUserProfile,
  signin,
  signup,
  updateFavorite,
  getFavorites,
  getBusiness
};