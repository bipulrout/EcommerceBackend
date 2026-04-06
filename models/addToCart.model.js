const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const addToCartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
    }],
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
})

const addToCartModel = model('addToCart', addToCartSchema);

module.exports = addToCartModel;
  
        