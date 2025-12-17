import { useEffect, useState } from "react";
import { getApplicants, updateApplicationStatus } from "../../api/tpo.api";
import { useParams } from "react-router-dom";

const Applicants = () => {
  const { companyId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await getApplicants(companyId);
      setApplications(res.data);
    };

    fetchApplicants();
  }, [companyId]);

  const updateStatus = async (id, status) => {
    await updateApplicationStatus(id, status);
    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, status } : app
      )
    );
  };

  return (
    <div>
      <h2>Applicants</h2>

      {applications.map((app) => (
        <div key={app._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <p>Name: {app.student.name}</p>
          <p>Email: {app.student.email}</p>
          <p>Status: {app.status}</p>

          <button onClick={() => updateStatus(app._id, "SHORTLISTED")}>
            Shortlist
          </button>
          <button onClick={() => updateStatus(app._id, "REJECTED")}>
            Reject
          </button>
          <button onClick={() => updateStatus(app._id, "SELECTED")}>
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default Applicants;
