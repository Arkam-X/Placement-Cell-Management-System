const Application = require("../models/Application");
const ListedCompany = require("../models/ListedCompany");
const { APPLICATION_STATUS } = require("../utils/constants");

const applyForCompany = async(req, res) => {
    try {
        const studentId = req.user._id;
        const {companyId} = req.body;

        if(!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        const company = await ListedCompany.findOne({
            _id: companyId,
            isActive: true
        });

        if(!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found or not active."
            });
        }

        if(req.user.cgpa < company.minimumCGPA || !company.allowedDepartments.includes(req.user.department) || !company.allowedYears.includes(req.user.year)) {
            return res.status(403).json({
                success: false,
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
            success: true,
            message: "Application submitted successfully.",
            data: {
                applicationId: application._id,
                status: application.status
            }
        });
    } catch(error) {
        if(error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "You have already applied to this company."
            });
        }

        console.log("Server error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while applying."
        });
    }
};

const getMyApplications = async(req, res) => {
    try {
        const studentId = req.user._id;

        const applications = await Application.find({student: studentId}).select("-__v")
        .populate({
            path: "company",
            select: "companyName roleOffered jobType internshipDurationMonths minimumCGPA criteria isActive"
        }).sort({createdAt: -1});

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch(error) {
        console.error("Get my applications error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching applications."
        });
    }
};

const getApplicantsByCompany = async(req, res) => {
    try {
        const { companyId } = req.params;

        if(!companyId) {
            return res.status(400).json({
                success: false,
                message: "Company ID is required"
            });
        }

        const applications = await Application.find({ company: companyId }).select("-__v")
        .populate({
        path: "student",
        select: "name email department year cgpa",
        })
        .populate({
        path: "company",
        select: "companyName roleOffered jobType",
        })
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch(error) {
        console.error("Get applicants by company error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching applicants"
        });
    }
};

const updateApplicationStatus = async(req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const allowedStatus = Object.values(APPLICATION_STATUS);

        if(!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status."
            });
        }

        const application = await Application.findById(applicationId);

        if(!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        application.status = APPLICATION_STATUS[status];
        await application.save();

        res.status(200).json({
            success: true,
            message: "Application status updated successfully.",
            data: {
                applicationId: application._id,
                status: application.status,
                updatedAt: application.updatedAt
            }
        });
    } catch(error) {
        console.error("Update application status error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating application status"
        });
    }
}

module.exports = {applyForCompany, getMyApplications, getApplicantsByCompany, updateApplicationStatus};