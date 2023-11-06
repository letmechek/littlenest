const mongoose = require('mongoose')
const Schema = mongoose.Schema
const babyProductSchema = require('./babyProductSchema')

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    babyProduct: babyProductSchema,
    selectedSize: String,
}, 
{
    // timestamps: true,
    toJSON: { virtuals: true }
})

lineItemSchema.virtual('extPrice').get(function() {
    return this.qty * this.babyProduct.price
})

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false },
    lastModified: { type: Date, default: Date.now } 

}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, babyProduct) => total + babyProduct.extPrice, 0)
})

orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, babyProduct) => total + babyProduct.qty, 0)
})

orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase()
})

orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        { user: userId, isPaid: false },
        { user: userId },
        { upsert: true, new: true }
    )
}

orderSchema.methods.addItemToCart = async function(babyProductId, selectedSize) {
    const cart = this;
    const lineItem = cart.lineItems.find(lineItem => lineItem.babyProduct._id.equals(babyProductId));
    if (lineItem) {
        lineItem.qty += 1;
        lineItem.selectedSize = selectedSize; // Update the selected size in the existing lineItem
    } else {
        const babyProduct = await mongoose.model('BabyProduct').findById(babyProductId);
        const newLineItem = {
            babyProduct,
            selectedSize: selectedSize  // Set selectedSize for the new lineItem
        };
        console.log(newLineItem)
        cart.lineItems.push(newLineItem);
    }
    console.log(selectedSize);
    return cart.save();
};
// orderSchema.methods.addItemToCart = async function(babyProductId, selectedSize) {
//     const cart = this;
//     const lineItem = cart.lineItems.find(lineItem => lineItem.babyProduct._id.equals(babyProductId));
//     if (lineItem) {
//       lineItem.qty += 1;
//     } else {
//       const babyProduct = await mongoose.model('BabyProduct').findById(babyProductId);
//       const newLineItem = { babyProduct };
//       if (selectedSize) {
//         newLineItem.selectedSize = selectedSize; // Store the selected size as a single value
//       }
//       cart.lineItems.push(newLineItem);
//     }
//     console.log(selectedSize)
//     return cart.save();
//   };

orderSchema.methods.setItemQty = function(babyProductId, newQty) {
    const cart = this
    const lineItem = cart.lineItems.find(lineItem => lineItem.babyProduct._id.equals(babyProductId))
    if(lineItem && newQty <= 0) {
        lineItem.remove()
    } else if(lineItem){
        lineItem.qty = newQty
    }
    return cart.save()
}

module.exports = mongoose.model('Order', orderSchema)