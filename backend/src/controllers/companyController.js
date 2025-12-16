const ListedCompany = require("../models/ListedCompany");

const addCompany = async(req, res) => {
    try {
        const {
            companyName,
            roleOffered,
            jobType,
            internshipDurationMonths,
            minimumCGPA,
            allowedDepartments,
            allowedYears,
            criteria,
            overviewTermsCondition,
            companyLogo
        } = req.body;

        if(!companyName || !roleOffered || !jobType || !internshipDurationMonths || !minimumCGPA || !allowedDepartments || !allowedYears || !criteria || !overviewTermsCondition) {
            return res.status(400).json({
                message: "Please provide all required fields."
            });
        }

        if(jobType === "INTERNSHIP" && !internshipDurationMonths){
            return res.status(400).json({
                message: "Internship duration is required for internship roles."
            });
        }

        const company = await ListedCompany.create({
            companyName,
            roleOffered,
            jobType,
            internshipDurationMonths: jobType === "INTERNSHIP" ? internshipDurationMonths : undefined,
            minimumCGPA,
            allowedDepartments,
            allowedYears,
            criteria,
            overviewTermsCondition,
            createdBy: req.user._id
        });

        res.status(201).json({
            message: "Company added successfully",
            company
        });
    } catch(error) {
        console.error("Add company error:", error);
        res.status(500).json({
            message: ("Server error while adding company.")
        });
    }
};

const getCompanies = async (req, res) => {
  try {
    let filter = {};
    let selectFields = "";

    // STUDENT view
    if (req.user.role === "STUDENT") {
      filter.isActive = true;
      selectFields =
        "companyName roleOffered jobType internshipDurationMonths minimumCGPA allowedDepartments allowedYears criteria overviewTermsCondition isActive createdAt";
    }

    // TPO/Admin view
    if (req.user.role === "TPO") {
      selectFields = "-__v";
    }

    const companies = await ListedCompany.find(filter)
      .select(selectFields)
      .sort({ createdAt: -1 })
      .populate(req.user.role === "TPO" ? "createdBy" : "");

    res.status(200).json({
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.error("Get companies error:", error);
    res.status(500).json({
      message: "Server error while fetching companies",
    });
  }
};

module.exports = { addCompany, getCompanies };