import { useEffect, useState } from "react";
import { getCompanies } from "../../api/company.api";
import { applyForCompany } from "../../api/application.api";
import "../../styles/student/companyList.css";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await getCompanies();
        setCompanies(res.data);
      } catch {
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
    <div className="company-page">
      <h2 className="company-title">Available Companies</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="company-grid">
        {companies.map((company) => (
          <div key={company._id} className="company-card">
            <div className="company-header">
              <h3 className="company-name">{company.companyName}</h3>
              <span className="cgpa-badge">
                Min CGPA: {company.minimumCGPA}
              </span>
            </div>

            <div className="company-meta">
              <p>
                <strong>Role:</strong> {company.roleOffered}
              </p>
              <p>
                <strong>Job Type:</strong> {company.jobType}
              </p>
            </div>

            <div className="badge-group">
              {company.allowedDepartments.map((dep) => (
                <span key={dep} className="badge">
                  {dep}
                </span>
              ))}
            </div>

            <div className="badge-group">
              {company.allowedYears.map((year) => (
                <span key={year} className="badge">
                  {year}
                </span>
              ))}
            </div>

            <button
              className="expand-btn"
              onClick={() =>
                setExpanded(expanded === company._id ? null : company._id)
              }
            >
              {expanded === company._id ? "Hide details ▲" : "View details ▼"}
            </button>

            {expanded === company._id && (
              <div className="company-details">
                {company.internshipDurationMonths && (
                  <p>
                    <strong>Duration:</strong>{" "}
                    {company.internshipDurationMonths} months
                  </p>
                )}
                <p>
                  <strong>Criteria:</strong> {company.criteria}
                </p>
                <p>
                  <strong>T&C:</strong> {company.overviewTermsCondition}
                </p>
              </div>
            )}

            <button
              className="apply-btn"
              onClick={() => handleApply(company._id)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
