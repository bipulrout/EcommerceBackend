const express = require("express")
const cartController = require("../controllers/cart.controller")
const middlewares = require("../middlewares/auth.middleware")

const router = express.Router();


router.post("/add-to-cart/:id", middlewares.authUser, cartController.addTocart)

module.exports = router;