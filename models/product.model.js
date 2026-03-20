const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        // required: true
    }
},
{
    timestamps: true
}
)

const productModel = mongoose.model("product", productSchema)

module.exports = productModel;