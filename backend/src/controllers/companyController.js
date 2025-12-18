const ListedCompany = require("../models/ListedCompany");
const Application = require("../models/Application");

const addCompany = async(req, res) => {
    try {
        let {
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

        // Basic validation
        if (
          !companyName ||
          !roleOffered ||
          !jobType ||
          !minimumCGPA ||
          !allowedDepartments ||
          !allowedYears ||
          !criteria ||
          !overviewTermsCondition
        ) {
          return res.status(400).json({
            message: "Please provide all required fields."
          });
        }

        if (typeof allowedDepartments === "string") {
          allowedDepartments = allowedDepartments.split(/[, ]+/);
        }

        if (typeof allowedYears === "string") {
          allowedYears = allowedYears.split(/[, ]+/);
        }

        allowedDepartments = allowedDepartments
          .map(dep => dep.trim())
          .filter(Boolean);

        allowedYears = allowedYears
          .map(year => year.trim())
          .filter(Boolean);


        if(!companyName || !roleOffered || !jobType || !minimumCGPA || !allowedDepartments || !allowedYears || !criteria || !overviewTermsCondition) {
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

      const companies = await ListedCompany.find(filter)
        .select(
          "companyName roleOffered jobType internshipDurationMonths minimumCGPA allowedDepartments allowedYears criteria overviewTermsCondition isActive createdAt"
        )
        .sort({ createdAt: -1 });

      // 🔑 Fetch student's applications
      const applications = await Application.find({
        student: req.user._id,
      });

      // Map companyId → status
      const appliedMap = {};
      applications.forEach((app) => {
        appliedMap[app.company.toString()] = app.status;
      });

      // Attach application info to each company
      const result = companies.map((company) => ({
        ...company.toObject(),
        hasApplied: !!appliedMap[company._id.toString()],
        applicationStatus: appliedMap[company._id.toString()] || null,
      }));

      return res.status(200).json({
        success: true,
        data: result,
      });
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