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

        if(!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Name, Email, Password and Role are required."
            });
        }

        if(role === "STUDENT") {
            if(!department || !year || !cgpa) {
                return res.status(400).json({
                    message: "Department, Year and CGPA are required for students."
                });
            }
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                message: "User already exists with this email."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            department,
            year,
            cgpa
        });

        res.status(201).json({
            message: "User registered Successfully.",
            userId: user._id
        });
    } catch(error) {
        console.error("Register error:", error);
        res.status(500).json({
            message: "Server ERROR!"
        });
    }
}

module.exports = { registerUser };