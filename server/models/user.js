const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        googleId: String,
        userName: { type: String, required: true },
        email: { type: String, required: true },
        password: String,
        image: String,
        type: {type: String, enum: ['Admin', 'Owner', 'Client'], required: true},
        favorites: [{ type: Schema.Types.ObjectId, default: [], ref: 'Business' }],     
      },
      {
        timestamps: true,        
      }
    );
  
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;


