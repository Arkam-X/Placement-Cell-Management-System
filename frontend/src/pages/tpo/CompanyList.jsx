// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/axios";

// const CompanyList = () => {
//   const [companies, setCompanies] = useState([]);

  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     const res = await api.get("/companies");
  //     setCompanies(res.data.companies);
  //   };

  //   fetchCompanies();
  // }, []);

//   return (
//     <div>
//       <h2>Companies</h2>

//       {companies.map((company) => (
//         <div key={company._id} style={{ border: "1px solid #ccc", margin: 10 }}>
//           <h3>{company.companyName}</h3>

//           <Link to={`/tpo/applicants/${company._id}`}>
//             View Applicants
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CompanyList;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/tpo/companyList.css";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     try {
  //       const res = await api.get("/companies");

  //       // ✅ backend-aligned response
  //       if (res.data.success) {
  //         setCompanies(res.data.companies);
  //       }
  //     } catch (err) {
  //       setError("Failed to load companies");
  //     }
  //   };

  //   fetchCompanies();
  // }, []);

    useEffect(() => {
    const fetchCompanies = async () => {
      const res = await api.get("/companies");
      setCompanies(res.data.companies);
    };

    fetchCompanies();
  }, []);

  return (
    <div className="tpo-company-page">
      <h2 className="tpo-company-title">Companies</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="tpo-company-grid">
        {companies.map((company) => (
          <div key={company._id} className="tpo-company-card">
            <div>
              <h3 className="tpo-company-name">
                {company.companyName}
              </h3>

              <p className="tpo-company-meta">
                <strong>Role:</strong> {company.roleOffered}
              </p>

              <p className="tpo-company-meta">
                <strong>Job Type:</strong> {company.jobType}
              </p>

              <p className="tpo-company-meta">
                <strong>Departments:</strong>{" "}
                {company.allowedDepartments.join(", ")}
              </p>

              {/* todo -- Applicants count */}
              <span className="applicants-badge">
                Applicants: {company.applicantsCount}
              </span>
            </div>

            <Link
              to={`/tpo/applicants/${company._id}`}
              className="view-applicants-btn"
            >
              View Applicants
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
