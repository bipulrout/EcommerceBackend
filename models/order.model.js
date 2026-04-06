const mongoose = require("mongoose")
const {model,Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "addToCart",
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal", "UPI", "cash_on_delivery"],
        required: true
    },
}, {
    timestamps: true
})

const orderModel = model("order", orderSchema)

module.exports = orderModel;