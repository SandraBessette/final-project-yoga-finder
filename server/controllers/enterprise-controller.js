
const mongoose = require('mongoose');
const EnterpriseModel = require('../models/enterprise');

const getEnterprises = async (req, res) => {
    const {lat, long, dist} = req.params;
    const METERS_PER_KM = 1000;
   
    if( !lat || !long)
        return res.status(400).json({ status: 400, message: "lat or long invalide", data: {lat, long} });

    const latFormat = parseFloat(lat);
    const longFormat = parseFloat(long);
    const distFormat = dist ? parseFloat(long) : 45; //45.5334, 74.0063
  
    try {        
        const result = await EnterpriseModel.find({ location:
                                                     { $nearSphere:
                                                         { $geometry:
                                                            { type: "Point", coordinates: [latFormat, longFormat] },
                                                             $maxDistance: distFormat * METERS_PER_KM 
                                                            } 
                                                        }
                                                     });
 
        res.status(200).json({ status: 200, message: "success", data: result });         

    } catch (error){
        res.status(404).json({ status: 404, error: error?.message });      
    }  
};

const getEnterprise = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ status: 404, message: `No enterprise with id: ${id}` }); 

    try {
        const result = await EnterpriseModel.findOne({ _id: id }).populate('userId').exec(); 
        if (result)     
            res.status(200).json({ status: 200, message: "success", data: result });  
        else  
            res.status(404).json({ status: 404, message: `No enterprise with id: ${id}` }); 
    }
    catch (error) {
        res.status(500).json({ status: 500, error: error?.message });   
    }

};

const createEnterprise = async (req, res) => {
   const {
    userId, //wont be there at the end with auth,,,,
    name,
    type,
    phone,
    address,
    location,
    image,
    tags,
    description,
    website,
    hours
    } = req.body;

    if (!(/\d{3}-\d{3}-\d{4}/.test(phone)))
        return res.status(400).json({ status: 400, message: "The phone number is invalide.", data: req.body }); 
    if (!(/^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/.test(address?.zip)))
        return res.status(400).json({ status: 400, message: "The zip code is invalide.", data: req.body });  

    try {
        const oldEnterprise = await EnterpriseModel.findOne({ userId, name });    
        if (oldEnterprise) 
            return res.status(400).json({ status: 400, message: "The enterprise already exists.", data: req.body });  

        const result = await EnterpriseModel.create({ ...req.body });  
        res.status(201).json({ status: 201, message: "success", data: result });

      } catch (error) {
        res.status(500).json({ status: 500, error: error?.message, message: "Something went wrong", data: req.body });        
        console.log(error);
      }   

};

const updateEnterprise = async (req, res) => {
    const { id } = req.params;

    const {
        userId, //wont be there at the end with auth,,,,
        name,
        type,
        phone,
        address,
        location,
        image,
        tags,
        description,
        website,
        hours
        } = req.body;
    
    if (!(/\d{3}-\d{3}-\d{4}/.test(phone)))
        return res.status(400).json({ status: 400, message: "The phone number is invalide.", data: req.body }); 
    if (!(/^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/.test(address?.zip)))
        return res.status(400).json({ status: 400, message: "The zip code is invalide.", data: req.body });  

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ status: 404, message: `No enterprise with id: ${id}` }); 

    try {        
        const oldEnterprise = await EnterpriseModel.findOne({ userId, name });    
        if (oldEnterprise) 
            return res.status(400).json({ status: 400, message: "The enterprise already exists.", data: req.body });

        const updatedEnterprise = { _id: id, ...req.body };
   
        const result = await EnterpriseModel.findByIdAndUpdate(id, updatedEnterprise, { new: true });        
        if (result)
            res.status(201).json({ status: 201, message: "enterprise updated", data: result }); 
        else  
            res.status(404).json({ status: 404, message: `No enterprise with id: ${id}` }); 

    } catch (error) {
        res.status(500).json({ status: 500, error: error?.message }); 
    } 
   

};

const deleteEnterprise = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ status: 404, message: `No enterprise with id: ${id}` }); 

    try {
        const result = await EnterpriseModel.findByIdAndRemove(id);        
        if (result)
            res.status(201).json({ status: 201, message: "Post deleted successfully." });  
        else  
            res.status(404).json({ status: 404, message: `No enterprise with id: ${id}` }); 

    } catch (error) {
        res.status(500).json({ status: 500, error: error?.message }); 
    } 
};

module.exports = { 
    getEnterprises,
    getEnterprise, 
    createEnterprise,
    updateEnterprise, 
    deleteEnterprise 
};