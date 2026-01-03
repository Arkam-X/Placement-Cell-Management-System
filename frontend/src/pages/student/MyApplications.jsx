import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/application.api";
import "../../styles/student/myApplications.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await getMyApplications();
        if (res.success) {
          setApplications(res.data);
        }
      } catch {
        setError("Failed to load applications");
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="applications-page">
      <h2 className="applications-title">My Applications</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="applications-grid">
        {applications.map((app) => (
          <div key={app._id} className="application-card">
            <h3 className="application-company">
              {app.company.companyName}
            </h3>

            <p className="application-meta">
              <strong>Role:</strong> {app.company.roleOffered}
            </p>

            <p className="application-meta">
              <strong>Job Type:</strong> {app.company.jobType}
            </p>

            {app.company.internshipDurationMonths && (
              <p className="application-meta">
                <strong>Duration:</strong>{" "}
                {app.company.internshipDurationMonths} months
              </p>
            )}

            <span className={`status-badge status-${app.status}`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
