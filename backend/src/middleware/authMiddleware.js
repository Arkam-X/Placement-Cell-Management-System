const jwt = require("jsonwebtoken");
const User = require('../models/User');

const protect = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header.
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to req excluding password.
            req.user = await User.findById(decoded.userId).select("-password");

            if(!req.user) {
                return res.status(401).json({
                    message: "User not found"
                });
            }
            next();
        } catch(error) {
            console.error("Auth error:", error);
            return res.status(401).json({
                message: "Not authorized, token failed"
            });
        }
    }

    if(!token) {
        return res.status(401).json({
            message: "Not authorized, no token"
        });
    }
};

const authorize = (...roles) => {
    return(req, res, next) => {
        if(!roles.include(req.user.role)) {
            return res.status(402).json({
                message: "Access denied, insufficient permission."
            });
        }
        next();
    }
};

module.exports = { protect, authorize };