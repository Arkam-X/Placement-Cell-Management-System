import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const res = await api.get("/companies");
      setCompanies(res.data.companies);
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <h2>Companies</h2>

      {companies.map((company) => (
        <div key={company._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{company.companyName}</h3>

          <Link to={`/tpo/applicants/${company._id}`}>
            View Applicants
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
