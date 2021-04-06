const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {  
   
    const token = req.headers.authorization?.split(" ")[1];   
 
     if (token && token !== 'undefined') { 
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        req.userId = decoded?.id;      
      }); 
    };
    next();
 
};

module.exports = auth;