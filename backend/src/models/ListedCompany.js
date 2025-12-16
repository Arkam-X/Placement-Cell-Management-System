const mongoose = require("mongoose");
const { JOB_TYPES, YEARS, DEPARTMENTS } = require("../utils/constants");

const listedCompanySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            trim: true
        },
        roleOffered: {
            type: String,
            required: true,
            trim: true
        },
        jobType:{
            type: String,
            enum: Object.values(JOB_TYPES),
            required: true
        },
        internshipDurationMonths: {
            type: Number,
            min: 1
        },
        minimumCGPA: {
            type: Number,
            min: 0,
            max: 10,
            required: true
        },
        allowedDepartments: {
            type: [String],
            enum: DEPARTMENTS   ,
            required: true
        },
        allowedYears: {
            type: [String],
            enum: YEARS,
            required: true
        },
        criteria: {
            type: String
        },
        overviewTermsCondition: {
            type: String
        },
        companyLogo: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("ListedCompany", listedCompanySchema)