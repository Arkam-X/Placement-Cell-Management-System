const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async(req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            department,
            year,
            cgpa
        } = req.body;
        
        // Validation.
        if(!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Name, Email, Password and Role are required."
            });
        }

        // Student specific validation.
        if(role === "STUDENT") {
            if(!department || !year || !cgpa) {
                return res.status(400).json({
                    message: "Department, Year and CGPA are required for students."
                });
            }
        }

        // Checks whether the user exists or not.
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                message: "User already exists with this email."
            });
        }

        // Hash password.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user.
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            department,
            year,
            cgpa
        });

        // Success message.
        res.status(201).json({
            success: true,
            message: "User registered Successfully."
        });
    } catch(error) {
        console.error("Register error:", error);
        res.status(500).json({
            message: "Server ERROR!"
        });
    }
};

const jwt = require("jsonwebtoken");

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Validation.
        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        // Find User.
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        // Compare Password.
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password."
            });
        }

        // Generate JWT.
        const token = jwt.sign({
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
        );

        // Success Response.
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch(error) {
        console.log("Error occurred:", error)
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { registerUser, loginUser };