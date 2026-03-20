const express = require("express")
const productController = require("../controllers/product.controller")

const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("../middlewares/upload")


const router = express.Router()



router.post("/createproduct", authMiddleware.authAdmin, upload.single("image"), productController.createProduct)

router.get("/get-all-products", authMiddleware.authUser, productController.getAllProducts)

router.get("/get-single-product/:id", authMiddleware.authUser, productController.getSingleProduct)


router.put("/update-product/:id", upload.single("image"), authMiddleware.authAdmin, productController.updateProduct)

router.delete("/delete-product/:id", authMiddleware.authAdmin, productController.deleteProduct)


module.exports = router;