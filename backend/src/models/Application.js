const mongoose = require("mongoose");
const { APPLICATION_STATUS } = require("../utils/constants");

const applicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ListedCompany",
            required: true
        },
        status: {
            type: String,
            enum: Object.values(APPLICATION_STATUS),
            default: APPLICATION_STATUS.APPLIED
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