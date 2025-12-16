const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ListedComapany",
            required: true
        },
        status: {
            type: String,
            enum: ["APPLIED", "SHORTLISTED", "REJECTED", "SELECTED"],
            default: "APPLIED"
        }
    },
    {
        timestamps: true
    }
);

// Prevent duplicate applications
applicationSchema.index(
  { student: 1, company: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", applicationSchema);