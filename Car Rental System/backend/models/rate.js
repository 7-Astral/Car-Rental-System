const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({
  review: { type: String, required: true },
  rate: { type: Number, required: true ,default:0},
  users:[{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
  cars: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Car' }]
});

module.exports = mongoose.model('Rate',rateSchema);
