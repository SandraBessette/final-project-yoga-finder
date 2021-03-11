const mongoose = require('mongoose');
const UserModel = require('../models/user');
const EnterpriseModel = require('../models/enterprise');


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



};

const signup = async (req, res) => {
  const { email, userName, type, favorites } = req.body;


  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    //const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ userName, email, type, favorites });

   // const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ status: 201, message: "success", data: result });
  } catch (error) {
    res.status(500).json({ error: error?.message, message: "Something went wrong" });
    
    console.log(error);
  }
};

const updateFavorite = async (req, res) => {
  const enterpriseId = req.body._id; 
 
  const id = "604806c1fd383244749bdc91"; //temporary, will recuperate that from the token

  if (!mongoose.Types.ObjectId.isValid(enterpriseId))
    return res.status(404).json({ status: 404, message: `No enterprise with id: ${id}` });   

  try {  
    const user = await UserModel.findOne({ _id: id }) ;
    if (!user)
      return res.status(404).json({ status: 404, message: `User not found` }); 

    const index = user.favorites.findIndex((id) => id.toString() === enterpriseId);   
    if (index === -1) {
      user.favorites.push(enterpriseId);
      await EnterpriseModel.updateOne({ _id: enterpriseId }, { $inc: { favoriteTotal: 1 } }); 
    } else {
      user.favorites = user.favorites.filter((id) => id.toString() !== enterpriseId);
      await EnterpriseModel.updateOne({ _id: enterpriseId }, { $inc: { favoriteTotal: -1 } });      
    }
 
    const result = await user.save();    
    res.status(200).json({ status: 200, message: "success", data: result.favorites });  
 
  } catch (error) {
    res.status(500).json({ status: 500, error: error?.message});    
   console.log(error);
  }


};

const getFavorites = async (req, res) => {
  const id = "604806c1fd383244749bdc91"; //temporary, will recuperate that from the token
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

const getEnterprises = async (req, res) =>{
  const id = "6046b5958f1dc73f986be1d0"; //temporary, will recuperate that from the token
  try {
    const result = await EnterpriseModel.find({ userId: id });
    if(result)
      res.status(200).json({ status: 200, message: "success", data: result });
    else
      res.status(404).json({ status: 404,  message: "Enterprises for this user not found"});
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
  getEnterprises
};