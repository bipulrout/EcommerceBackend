const userModel = require("../models/user.model")
const productModel = require("../models/product.model")
const addTocartModel = require("../models/addToCart.model")


const addTocart = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        let cart = await addTocartModel.findOne({ user: req.user.id })

        if (!cart) {
            cart = await addTocartModel.create({
                user: req.user.id,
                products: [product._id],
                quantity: 1
            })
        } else {
            const productIndex = cart.products.findIndex(p => p.toString() === product._id.toString())
            if (productIndex !== -1) {
                cart.quantity += 1;
            } else {
                cart.products.push(product._id);
                cart.quantity = 1;
            }
            await cart.save();
        }
        res.status(200).json({ message: "Product added to cart successfully", cart });

    } catch (error) {
        res.status(500).json({ message: "Server Error..", error: error.message });
    }
}


module.exports = {addTocart}