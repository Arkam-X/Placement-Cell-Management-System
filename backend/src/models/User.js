const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["STUDENT", "TPO"],
            required: true
        },
        department: {
            type: String,
            enum: ["AIML", "IOT", "CE", "MECH", "CIVIL", "EXTC"],
        },
        year: {
            type: String,
            enum: ["FE", "SE", "TE", "BE"],
        },
        cpga: {
            type: Number
        }, 
    },
    {
        timestamp: true
    }
);
    
module.exports = mongoose.model("User", userSchema); 