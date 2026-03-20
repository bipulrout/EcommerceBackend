const productModel = require('../models/product.model');
const {cloudinary} = require('../config/cloudinary');

// create product
const createProduct = async (req, res) => {

    try {
        const { productname, price, description, stock, category } = req.body;
        let imageUrl = "";
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products"
            });
            imageUrl = result.secure_url;
        }

        const products = await productModel.create({
            productname,
            price, 
            description,
            image: imageUrl,
            stock, 
            category,
            createdBy: req.user.id
        })

        res.status(201).json({
            message: "Product create succssesfully",
            products
        })
        
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


// get all products
const getAllProducts = async (req, res) => {

   try {
     const products = await productModel.find().populate("createdBy", "username email")

     res.status(200).json({
        message: "All products fetched successfully",
        totalProducts: products.length,
        products
     })
   } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
   }

}

// get single product
const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel
        .findById(req.params.id)
        .populate("createdBy", "username email")


        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "Product fetched successfully",
            product
        })

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}



const updateProduct = async (req, res) => {
    try {
       const productId = await productModel.findById(req.params.id);

       if (!productId) {
            return res.status(404).json({
                message: "Product not found"
            });
       }

       if (productId.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this product"
            });
       }

         if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products"
            });
            req.body.image = result.secure_url;
        }

         const updateProduct = await productModel
         .findByIdAndUpdate(req.params.id, req.body, {returnDocument: "after"});

       res.status(200).json({
        message: "Product updated successfully",
        updateProduct
       })

       

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


const deleteProduct = async (req, res) => {
    const product = await productModel.findById(req.params.id)

    if (!product) {
        return res.status(404).json({
            message: "Product Not Found"
        })
    }

    if (product.createdBy.toString() !== req.user.id) {
        return res.status(403).json({
            message: "You Can only delete your own products"
        })
    }

    await productModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
        message: "Product deleted successfully"
    })

}

module.exports = {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct}