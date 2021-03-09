const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const commentSchema = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, require: true, ref: 'User'},
        entrepriseId: {type: Schema.Types.ObjectId, require: true, ref: 'Enterprise'},
        rating: Number,
        message: String        
      },
      {
        timestamps: true,        
      }
    );
  
const CommentModel = mongoose.model("Comment", commentSchema);
module.exports = CommentModel;