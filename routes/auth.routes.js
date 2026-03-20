const express = require("express")
const authController = require("../controllers/auth.controller")

const router = express.Router()


router.post("/register", authController.registerUser)
router.post("/login", authController.logIn)
router.post("/logout", authController.logOut)


module.exports = router;