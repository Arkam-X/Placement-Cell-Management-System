import { useState, useEffect } from "react";
import { addCompany } from "../../api/tpo.api";
import "../../styles/tpo/addCompany.css";

const AddCompany = () => {
    useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [form, setForm] = useState({
    companyName: "",
    roleOffered: "",
    jobType: "",
    internshipDurationMonths: "",
    minimumCGPA: "",
    criteria: "",
    allowedDepartments: "",
    allowedYears: "",
    overviewTermsCondition: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      allowedDepartments: form.allowedDepartments
        .split(/[, ]+/)
        .map((d) => d.trim())
        .filter(Boolean),
      allowedYears: form.allowedYears
        .split(/[, ]+/)
        .map((y) => y.trim())
        .filter(Boolean),
      internshipDurationMonths:
        form.jobType === "INTERNSHIP"
          ? Number(form.internshipDurationMonths)
          : undefined,
    };

    try {
      const res = await addCompany(payload);
      alert(res.message || "Company added successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add company");
    }
  };

  return (
    <div className="add-company-page">
      <div className="add-company-container">
        <h2 className="add-company-title">Add Company</h2>

        <form onSubmit={handleSubmit} className="add-company-form">
          <input
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
            required
            className="add-company-input"
          />

          <input
            name="roleOffered"
            placeholder="Role Offered"
            onChange={handleChange}
            required
            className="add-company-input"
          />

          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            required
            className="add-company-select"
          >
            <option value="">Select Job Type</option>
            <option value="FULL TIME">FULL TIME</option>
            <option value="INTERNSHIP">INTERNSHIP</option>
          </select>

          {form.jobType === "INTERNSHIP" && (
            <input
              name="internshipDurationMonths"
              type="number"
              placeholder="Internship Duration (months)"
              onChange={handleChange}
              required
              className="add-company-input"
            />
          )}

          <input
            name="minimumCGPA"
            type="number"
            step="0.01"
            placeholder="Minimum CGPA"
            onChange={handleChange}
            required
            className="add-company-input"
          />

          <input
            name="criteria"
            placeholder="Eligibility Criteria"
            onChange={handleChange}
            required
            className="add-company-input"
          />

          <input
            name="allowedDepartments"
            placeholder="Departments (AIML, IOT, CE, IT, MECH, CIVIL, EXTC)"
            onChange={handleChange}
            required
            className="add-company-input"
          />

          <input
            name="allowedYears"
            placeholder="Years (FE, SE, TE, BE)"
            onChange={handleChange}
            required
            className="add-company-input"
          />

          <input
            name="overviewTermsCondition"
            placeholder="Terms & Conditions URL"
            onChange={handleChange}
            required
            className="add-company-input"
          />

          <button type="submit" className="add-company-button">
            Add Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompany;
