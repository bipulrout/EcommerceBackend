const express = require('express');
const orderController = require("../controllers/order.controller")
const middlewares = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/order-create", middlewares.authUser, orderController.createOrder)


module.exports = router;