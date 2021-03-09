const UserModel = require('../models/user');


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
  const { email, userName, type } = req.body;


  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    //const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ userName, email, type });

   // const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

    res.status(201).json({ status: 201, message: "success", data: result });
  } catch (error) {
    res.status(500).json({ error: error?.message, message: "Something went wrong" });
    
    console.log(error);
  }
};

const updateFavorite = async (req, res) => {



};

const getFavorites = async (req, res) => {



};

module.exports = { 
  getUsers, 
  signin,
  signup,
  updateFavorite,
  getFavorites
};