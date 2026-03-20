const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// ======= Register =======
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role = "user" } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne(
            {
                $or: [
                    {username},
                    {email}
                ]
            }
        );

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role
        });

        const token = generateToken(user._id, user.role);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });


        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message 
        });
    }
}


// ============ LogIn =========
const logIn = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const user = await userModel.findOne({
            $or : [{username}, {email}]
        })


        if (!user) {
            return res.status(401).json({
                message: "Invalid credntials"
            })
        }

        /* ==== Compare login password and DB stored password ====*/
        const isPasswordValid = await bcrypt.compare(password, user.password)

        /* === Check password valid or not === */
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credntials"
            })
        }

        const token = generateToken(user._id, user.role)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(201).json({
            message: "User login successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message 
        });
    }
}


// ============= LogOut ============

async function logOut(req, res) {
    try {
        // res.cookie("token", "", {
        //     httpOnly: true,
        //     expires: new Date(0)
        // })

        res.clearCookie("token")

        res.json({
            message: "Logout successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while logging out",
            error: error.message
        })
    }
}



module.exports = { registerUser, logIn, logOut };