const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const enterpriseSchema = new Schema(
    {
        userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
        name: {type: String, required: true},
        type: {type: String, enum: ['Yoga', 'Meditation', 'Accessory'], required: true},
        phone: { type: String , required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            zip: { type: String, required: true },
            province: { type: String, required: true },
            country: { type: String, required: true },
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
              start: { type: Date, default: new Date().setHours(8, 0, 0, 0) },
              end: { type: Date, default: new Date().setHours(4, 30, 0, 0) },
             }, 
            tuesday: {
              start: { type: Date, default: new Date().setHours(8, 0, 0, 0) },
              end: { type: Date, default: new Date().setHours(4, 30, 0, 0) },
             },  
            wednesday: {
              start: { type: Date, default: new Date().setHours(8, 0, 0, 0) },
              end: { type: Date, default: new Date().setHours(4, 30, 0, 0) },
             },  
            thursday: {
              start: { type: Date, default: new Date().setHours(8, 0, 0, 0) },
              end: { type: Date, default: new Date().setHours(4, 30, 0, 0) },
             }, 
            friday: {
              start: { type: Date, default: new Date().setHours(8, 0, 0, 0) },
              end: { type: Date, default: new Date().setHours(4, 30, 0, 0) },
             },  
            saturday: {
              start: { type: Date, default: new Date().setHours(8, 0, 0, 0) },
              end: { type: Date, default: new Date().setHours(4, 30, 0, 0) },
             }, 
            sunday: {
              start: { type: Date, default: new Date().setHours(8, 0, 0, 0) },
              end: { type: Date, default: new Date().setHours(4, 30, 0, 0) },
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