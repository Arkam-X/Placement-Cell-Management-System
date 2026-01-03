// import { useEffect, useState } from "react";
// import { getApplicants, updateApplicationStatus } from "../../api/tpo.api";
// import { useParams } from "react-router-dom";

// const Applicants = () => {
//   const { companyId } = useParams();
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     const fetchApplicants = async () => {
//       const res = await getApplicants(companyId);
//       setApplications(res.data);
//     };

//     fetchApplicants();
//   }, [companyId]);

//   const updateStatus = async (id, status) => {
//     await updateApplicationStatus(id, status);
//     setApplications((prev) =>
//       prev.map((app) =>
//         app._id === id ? { ...app, status } : app
//       )
//     );
//   };

//   return (
//     <div>
//       <h2>Applicants</h2>

//       {applications.map((app) => (
//         <div key={app._id} style={{ border: "1px solid #ccc", margin: 10 }}>
//           <p>Name: {app.student.name}</p>
//           <p>Email: {app.student.email}</p>
//           <p>Status: {app.status}</p>

//           <button onClick={() => updateStatus(app._id, "SHORTLISTED")}>
//             Shortlist
//           </button>
//           <button onClick={() => updateStatus(app._id, "REJECTED")}>
//             Reject
//           </button>
//           <button onClick={() => updateStatus(app._id, "SELECTED")}>
//             Select
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Applicants;
import { useEffect, useState } from "react";
import { getApplicants, updateApplicationStatus } from "../../api/tpo.api";
import { useParams } from "react-router-dom";
import "../../styles/tpo/applicants.css";

const Applicants = () => {
  const { companyId } = useParams();
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await getApplicants(companyId);
        setApplications(res.data);
      } catch {
        setError("Failed to load applicants");
      }
    };

    fetchApplicants();
  }, [companyId]);

  const updateStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="applicants-page">
      <h2 className="applicants-title">Applicants</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="applicants-grid">
        {applications.map((app) => (
          <div key={app._id} className="applicant-card">
            <h3 className="applicant-name">
              {app.student.name}
            </h3>

            <p className="applicant-email">
              {app.student.email}
            </p>

            <span className={`status-badge status-${app.status}`}>
              {app.status}
            </span>

            <div className="action-buttons">
              <button
                className="action-btn shortlist-btn"
                onClick={() => updateStatus(app._id, "SHORTLISTED")}
              >
                Shortlist
              </button>

              <button
                className="action-btn reject-btn"
                onClick={() => updateStatus(app._id, "REJECTED")}
              >
                Reject
              </button>

              <button
                className="action-btn select-btn"
                onClick={() => updateStatus(app._id, "SELECTED")}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applicants;
