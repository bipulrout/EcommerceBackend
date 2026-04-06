const orderModel = require("../models/order.model")
const addTocartModel = require("../models/addToCart.model")
const productModel = require("../models/product.model")

const createOrder = async (req, res) => {

    try {
        
        const cart = await addTocartModel.findOne({ user: req.user.id }).populate("products")
        const quantity = cart.quantity

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const totalPrice = cart.products.reduce((total, product) => total + product.price * quantity, 0)

        const order = await orderModel.create({
            user: req.user.id,
            products: cart.products.map(product => product._id),
            totalPrice,
            paymentMethod: req.body.paymentMethod
        })

        res.status(201).json({ message: "Order created successfully", order });

    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
}

module.exports = {createOrder}