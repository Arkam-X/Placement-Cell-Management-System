const User = require("../models/User");
const Application = require("../models/Application");

const getAllStudentsWithApplications = async (req, res) => {
  try {
    const { search, department, year, company } = req.query;

    // 1️⃣ Student base filter
    let studentFilter = { role: "STUDENT" };

    if (department) studentFilter.department = department;
    if (year) studentFilter.year = year;

    if (search) {
      studentFilter.$or = [
        { name: { $regex: search, $options: "i" } },
        { prn: { $regex: search, $options: "i" } },
      ];
    }

    const students = await User.find(studentFilter)
      .select("prn name email department year cgpa");

    const applications = await Application.find()
      .populate("company", "companyName")
      .populate("student", "_id");

    const result = students.map((student, index) => {
      const studentApps = applications.filter(
        (app) => app.student._id.toString() === student._id.toString()
      );

      const companies = studentApps.map(
        (app) => app.company.companyName
      );

      const statuses = studentApps.map((app) => {
        if (app.status === "SHORTLISTED") return "SL";
        if (app.status === "REJECTED") return "R";
        if (app.status === "SELECTED") return "S";
        return "-";
      });

      return {
        serialNo: index + 1,
        prn: student.prn || "-",
        name: student.name,
        email: student.email,
        department: student.department,
        year: student.year,
        cgpa: student.cgpa,
        companies: companies.join(", "),
        status: statuses.join(", "),
      };
    });

    // 2️⃣ Filter by company (post-processing)
    const filteredResult = company
      ? result.filter((s) =>
          s.companies.toLowerCase().includes(company.toLowerCase())
        )
      : result;

    res.status(200).json({
      success: true,
      data: filteredResult,
    });
  } catch (error) {
    console.error("TPO student filter error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student data",
    });
  }
};

module.exports = { getAllStudentsWithApplications };