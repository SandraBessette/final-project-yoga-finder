
const mongoose = require('mongoose');
const BusinessModel = require('../models/business');

const getBusiness = async (req, res) => {
    const {lat, long, dist} = req.params;
    const METERS_PER_KM = 1000;
   
    if( !lat || !long)
        return res.status(400).json({ status: 400, message: "lat or long invalide", data: {lat, long} });

    const latFormat = parseFloat(lat);
    const longFormat = parseFloat(long);
    const distFormat = dist ? parseFloat(long) : 45; //45.5334, 74.0063
  
    try {        
        const result = await BusinessModel.find({ location:
                                                    { $nearSphere:
                                                        { $geometry:
                                                            { type: "Point", coordinates: [longFormat, latFormat] },
                                                             $maxDistance: distFormat * METERS_PER_KM 
                                                            } 
                                                        }
                                                    });
 
        res.status(200).json({ status: 200, message: "success", data: result });         

    } catch (error){
        res.status(404).json({ status: 404, error: error?.message });      
    }  
};

const getFilteredBusiness = async (req, res) => {
    const {
        bounds, 
        center,
        dist,
        filters,
        sort,
        type,
        limit       
        } = req.body;

    const pipeline = [];
    pipeline.push( {
        $geoNear: {
            near: { type: "Point", coordinates: center },
            distanceField: "dist.calculated",
            distanceMultiplier: 0.001,
            query: { location: {
                $geoIntersects: {
                    $geometry: {
                        type : "Polygon" ,
                        coordinates: [ [ bounds.nw, bounds.ne, bounds.se, bounds.sw, bounds.nw ] ]
                    }
                }
            }},           
            spherical: true,            
        }
    }); 
    pipeline.push( { $limit: 100 });
    /*pipeline.push( {
        $geoNear: {
            near: { type: "Point", coordinates: center },
            distanceField: "dist.calculated",           
            spherical: true
        }
    }); 
    pipeline.push( { $limit: 100 });
    pipeline.push( {
        $match: {
            location: {
                $geoWithin: {
                    $geometry: {
                        type : "Polygon" ,
                        coordinates: [ [ bounds.nw, bounds.ne, bounds.se, bounds.sw, bounds.nw ] ]
                    }
                }
            }
        }
    });*/
       
    try{  
        const query = BusinessModel.aggregate([pipeline]); 
        const result = await query.exec();
   
        res.status(200).json({ status: 201, message: "success", data: result});  
    } catch (error){
        console.log("error", error.message);
        res.status(500).json({ status: 500, error: error?.message });      
    }  

};

const getSingleBusiness = async (req, res) => {
    const { id } = req.params;  

    if (!mongoose.Types.ObjectId.isValid(id))
       return res.status(404).json({ status: 404, message: `No business with id: ${id}` }); 

    try {   
        const result = await BusinessModel.findOne({ _id: id }).populate('userId').exec();    
        if (result) {     
            res.status(200).json({ status: 200, message: "success", data: result });  
        }
           
        else {        
            res.status(404).json({ status: 404, message: `No business with id: ${id}` }); 
        } 
            
    }
    catch (error) {
        console.log("500", error.message);
        res.status(500).json({ status: 500, error: error?.message });   
    }

};

const createBusiness = async (req, res) => {
   const {  
    name,  
    type  
    } = req.body;

    const userId = req.userId; 
    if (!userId) {
        return res.status(400).json({ status: 400, message: "The user is not authenticated", data: req.body });
      }

    try {
        const oldBusiness = await BusinessModel.findOne({ name, type });    
        if (oldBusiness) 
            return res.status(400).json({ status: 400, message: "The business already exists.", data: req.body });  

        const result = await BusinessModel.create({ ...req.body,   userId});  
        res.status(201).json({ status: 201, message: "success", data: result });

      } catch (error) {
        res.status(500).json({ status: 500, error: error?.message, message: "Something went wrong", data: req.body });        
        console.log(error);
      }   

};

const updateBusiness = async (req, res) => {
    const { id } = req.params;

    const {  
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

    const userId = req.userId; 
    if (!userId) {
        return res.status(400).json({ status: 400, message: "The user is not authenticated", data: req.body });
    }
    
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ status: 404, message: `No business with id: ${id}` }); 

    try {        
        const oldBusiness = await BusinessModel.findOne({ name, type });    
        if (oldBusiness && oldBusiness._id.toString() !== id) 
            return res.status(400).json({ status: 400, message: "An business with this name already exists.", data: req.body });

        const updatedBusiness = { _id: id, userId, ...req.body };
   
        const result = await BusinessModel.findByIdAndUpdate(id, updatedBusiness, { new: true });        
        if (result)
            res.status(201).json({ status: 201, message: "business updated", data: result }); 
        else  
            res.status(404).json({ status: 404, message: `No business with id: ${id}` }); 

    } catch (error) {
        res.status(500).json({ status: 500, error: error?.message }); 
    } 
   

};

const deleteBusiness = async (req, res) => {
    const { id } = req.params;

    const userId = req.userId; 
    if (!userId) {
        return res.status(400).json({ status: 400, message: "The user is not authenticated", data: id });
    }
    

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ status: 404, message: `No business with id: ${id}`, data: id }); 

    try {
        const result = await BusinessModel.findByIdAndRemove(id);        
        if (result)
            res.status(201).json({ status: 201, message: "Business deleted successfully." });  
        else  
            res.status(404).json({ status: 404, message: `No business with id: ${id}`, data: id }); 

    } catch (error) {
        res.status(500).json({ status: 500, error: error?.message }); 
    } 
};

module.exports = { 
    getBusiness,
    getSingleBusiness, 
    createBusiness,
    updateBusiness, 
    deleteBusiness,
    getFilteredBusiness
};