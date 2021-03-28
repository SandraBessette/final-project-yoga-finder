

const mongoose = require('mongoose');  
const UserModel = require('../models/user');
const BusinessModel = require('../models/business');
const CommentModel = require('../models/comment');


const getBusinessComments = async (req, res) => {
    const businessId = req.params.id;
    console.log('businessId', businessId);

    if (!mongoose.Types.ObjectId.isValid( businessId ))
        return res.status(404).json({ status: 404, message: `No business with id: ${ businessId }` }); 
      
    try {
      const result = await CommentModel.find({ businessId }).populate('userId').exec(); 
      console.log('result', result);
      if (result)
        res.status(200).json({ status: 200, message: "success", data: result });
      else
        res.status(404).json({ status: 404,  message: "comment not found", data: businessId});
    } catch (error) {
      res.status(500).json({ status: 500, error: error?.message});    
     console.log(error);
    }
  };

  const getUserComments = async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid( userId ))
        return res.status(404).json({ status: 404, message: `No user with id: ${ userId }` }); 
      
    try {
      const result = await CommentModel.find({ userId }).populate('businessId').exec(); 
      if (result)
        res.status(200).json({ status: 200, message: "success", data: result });
      else
        res.status(404).json({ status: 404,  message: "comments not found", data:  userId});
    } catch (error) {
      res.status(500).json({ status: 500, error: error?.message});    
     console.log(error);
    }

  }
  
  const createComment = async (req, res) => {
    const { businessId} = req.params;
    const {  
        rating,
        message
        } = req.body;
    
        const userId = req.userId; 
        if (!userId) {
            return res.status(401).json({ status: 401, message: "The user is not authenticated", data: req.body });
          }
    
        try {          
           //update the business rating
            const business = await BusinessModel.findOne({ _id: businessId  });    
            if (!business) 
                return res.status(404).json({ status: 404, message: "The business id is not found", data: req.body });

            const numberRating = parseFloat(rating);            
            business.ratingCount = business.ratingCount + 1;
            business.ratingTotal = business.ratingTotal + numberRating;
            business.ratingResult = business.ratingTotal / business.ratingCount;
            const resultBusiness = await business.save();  
            if (!resultBusiness)  
                return res.status(400).json({ status: 400, message: "Something went wrong", data: req.body });  
            
            //create the comment
            const result = await CommentModel.create({ userId, businessId, rating: numberRating, message});             
            
            res.status(201).json({ status: 201, message: "success", data: result });
    
          } catch (error) {
            res.status(500).json({ status: 500, error: error?.message, message: "Something went wrong", data: req.body });        
            console.log(error);
          }   

    }

module.exports = { 
    getBusinessComments, 
    getUserComments,
    createComment    
  };