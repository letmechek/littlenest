const Schema = require('mongoose').Schema;



const babyProductSchema = new Schema({
  name: { type: String, required: true },
  image: [{ type: String, required: true }],
  BabyCategory: {type: Schema.Types.ObjectId, ref: 'BabyCategory'},
  price: { type: Number, required: true, default: 0 },
  size: [{ type: String }],
  color: [{ type: String }],
  inStock: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = babyProductSchema;

