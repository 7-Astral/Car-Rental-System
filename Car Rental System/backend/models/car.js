const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
  carName: { type: String, required: true },
  carType: { type: String, required: true },
  carImage: { type: String, required: true },
  carSpecs: { type: String, required: true },
  carTransmission: { type: String, required: true },
  carMilage: { type: String, required: true },
  carRent:  { type:Number, required: true },
  carNumberPlate:  { type:String, required: true },
  carStatus:{type:Boolean,default: false},
  cloud_id:{type: String}
});

module.exports = mongoose.model('Car', carSchema);
