const Schema = require('mongoose').Schema;



const babyProductSchema = new Schema({
  name: { type: String, required: true },
  image: [{ type: String, required: true }],
  BabyCategory: {type: Schema.Types.ObjectId, ref: 'BabyCategory'},
  price: { type: Number, required: true, default: 0 },
  size: [{ type: String }]
}, {
  timestamps: true
});

module.exports = babyProductSchema;

