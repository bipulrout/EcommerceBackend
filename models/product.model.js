const mongoose = require("mongoose")
const {model,Schema } = mongoose;

const productSchema = new Schema({
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
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdBy :{
        type: Schema.Types.ObjectId,
        ref: "user",
        // required: true
    }
},
{
    timestamps: true
}
)

const productModel = model("product", productSchema)

module.exports = productModel;