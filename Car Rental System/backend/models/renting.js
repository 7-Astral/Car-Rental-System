const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rentPrice: { type: String, required: true },
  driver:{type:Boolean},
  users:[{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
  cars: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Car' }]
});

module.exports = mongoose.model('Renting',rentSchema);
