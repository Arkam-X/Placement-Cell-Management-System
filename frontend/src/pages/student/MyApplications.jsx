import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/application.api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await getMyApplications();
      if (res.success) {
        setApplications(res.data);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h2>My Applications</h2>

      {applications.map((app) => (
        <div key={app._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h4>{app.company.companyName}</h4>
          <p>Role: {app.company.roleOffered}</p>
          <p>Job Type: {app.company.jobType}</p>
          <p>Months: {app.company.internshipDurationMonths}</p>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
