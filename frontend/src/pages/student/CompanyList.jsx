import { useEffect, useState } from "react";
import { getCompanies } from "../../api/company.api";
import { applyForCompany } from "../../api/application.api";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

    useEffect(() => {
    const fetchCompanies = async () => {
        try {
        const res = await getCompanies();
        setCompanies(res.data);
        } catch (err) {
        setError("Failed to load companies");
        }
    };

    fetchCompanies();
    }, []);

    const handleApply = async (companyId) => {
      try {
        await applyForCompany(companyId);
        alert("Applied successfully");
      } catch (err) {
        alert(err.response?.data?.message || "Apply failed");
      }
    };


  return (
    <div>
      <h2>Available Companies</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {companies.map((company) => (
        <div key={company._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{company.companyName}</h3>
          <p>Min CGPA: {company.minimumCGPA}</p>
          <p>Role: {company.roleOffered}</p>
          <p>Job Type: {company.jobType}</p>
          <p>Months: {company.internshipDurationMonths}</p>
          <p>Department: {company.allowedDepartments.join(", ")}</p>
          <p>Years: {company.allowedYears.join(", ")}</p>
          <p>Criteria: {company.criteria}</p>
          <p>T&C: {company.overviewTermsCondition}</p>

          <button onClick={() => handleApply(company._id)}>
            Apply
          </button>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
