require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const productRoutes = require("./routes/product.routes")
const cartRoutes = require("./routes/cart.routes")
const orderRoutes = require("./routes/order.routes")

const app = express()
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)

connectDB()
app.listen(process.env.PORT, () => {
    console.log('Server is running on port number', process.env.PORT)
})