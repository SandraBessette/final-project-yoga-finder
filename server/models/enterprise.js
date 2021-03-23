const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const enterpriseSchema = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
        name: {type: String, required: true},
        type: {type: String, enum: ['Yoga', 'Meditation', 'Accessory'], required: true},
        phone: { type: String , required: true },
        address: {
            formatted:{ type: String, required: true },           
            zip: { type: String, required: true }           
        },
        location: {
            type: {
              type: String,
              enum: ['Point'],
              default: 'Point'              
            },
            coordinates: {
              type: [Number],              
              required: true
            }
          },
        image: [{ type: String, default: []}],
        tags: [{ type: String, default: []}],
        description: String,
        website: String,
        hours: {
            monday: {
              start: { type: String, default: "08:00" },
              end: { type: String, default: "17:00" },
              type: {type: String, enum: ['Open', 'Close'], default: 'Open'},
             }, 
            tuesday: {
              start: { type: String, default: "08:00" },
              end: { type: String, default: "17:00" },
              type: {type: String, enum: ['Open', 'Close'], default: 'Open'},
             },  
            wednesday: {
              start: { type: String, default: "08:00" },
              end: { type: String, default: "17:00" },
              type: {type: String, enum: ['Open', 'Close'], default: 'Open'},
             },  
            thursday: {
              start: { type: Date, default: new Date().setHours(8, 0, 0, 0) },
              end: { type: Date, default: new Date().setHours(17, 0, 0, 0) },
              type: {type: String, enum: ['Open', 'Close'], default: 'Open'},
             }, 
            friday: {
              start: { type: String, default: "08:00" },
              end: { type: String, default: "17:00" },
              type: {type: String, enum: ['Open', 'Close'], default: 'Open'},
             },  
            saturday: {
              start: { type: String, default: "08:00" },
              end: { type: String, default: "17:00" },
              type: {type: String, enum: ['Open', 'Close'], default: 'Open'},
             }, 
            sunday: {
              start: { type: String, default: "08:00" },
              end: { type: String, default: "17:00" },
              type: {type: String, enum: ['Open', 'Close'], default: 'Open'},
             },           
        },
        favoriteTotal: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 },
        ratingTotal: { type: Number, default: 0 },
        ratingResult: { type: Number, default: 0 },
      },
      {
        timestamps: true,     
      }
    );
enterpriseSchema.index({location: '2dsphere'});

const EnterpriseModel = mongoose.model("Enterprise", enterpriseSchema);
module.exports = EnterpriseModel;

//moment ddd for day from Mon to Sun
//HH for 24hour