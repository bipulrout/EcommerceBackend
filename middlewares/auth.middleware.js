const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthrized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "You don't have access to create product"
            })
        }

        req.user = decoded

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthrized"
        })
    }
}



// Auth user

const authUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthrized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthrized"
        })
    }
}


module.exports = {authAdmin, authUser}