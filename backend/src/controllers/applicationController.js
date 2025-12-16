const Application = require("../models/Application");
const ListedCompany = require("../models/ListedCompanies");

const applyForCompany = async(req, res) => {
    try {
        const studentId = req.user._id;
        const {companyId} = req.body;

        if(!companyId) {
            return res.status(400).json({
                message: "Company ID is required"
            });
        }

        const company = await ListedCompany.findOne({
            _id: companyId,
            isActive: true
        });

        if(!company) {
            return res.status(404).json({
                message: "Company not found or not active."
            });
        }

        if(req.user.cgpa < company.minimumCGPA || !company.allowedDepartments.includes(req.user.department) || !company.allowedYears.includes(req.user.year)) {
            return res.status(403).json({
                message: "You are not eligible to apply for this company."
            });
        }

        const application = await Application.create(
            {
                student: studentId,
                company: companyId
            }
        );
        res.status(201).json({
            message: "Application submitted successfully.",
            application
        });
    } catch(error) {
        if(error.code === 11000) {
            return res.status(400).json({
                message: "You have already applied to this commpany."
            });
        }

        console.log("Server error:", error);
        res.status(500).json({
            message: "Server error while applying."
        });
    }
};

module.exports = {applyForCompany};