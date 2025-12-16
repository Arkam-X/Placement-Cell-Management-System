const mongoose = require("mongoose");
const { ROLES, YEARS, DEPARTMENTS } = require("../utils/constants");

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
            enum: Object.values(ROLES),
            required: true
        },
        department: {
            type: String,
            enum: DEPARTMENTS,
        },
        year: {
            type: String,
            enum: YEARS
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