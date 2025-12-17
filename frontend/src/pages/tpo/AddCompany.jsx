import { useState } from "react";
import { addCompany } from "../../api/tpo.api";

const AddCompany = () => {
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
      allowedDepartments: form.allowedDepartments.split(","),
      allowedYears: form.allowedYears.split(","),
    };

    try {
      const res = await addCompany(payload);
      alert(res.message || "Company added");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add company");
    }
  };

  return (
    <div>
      <h2>Add Company</h2>

      <form onSubmit={handleSubmit}>
        <input name="companyName" placeholder="Company Name" onChange={handleChange} /><br />
        <input name="roleOffered" placeholder="Role Offered" onChange={handleChange} /><br />
        <input name="jobType" placeholder="Job Type" onChange={handleChange} /><br />
        <input name="internshipDurationMonths" placeholder="Internship Months" onChange={handleChange} /><br />
        <input name="minimumCGPA" placeholder="Minimum CGPA" onChange={handleChange} /><br />
        <input name="criteria" placeholder="Criteria" onChange={handleChange} /><br />
        <input name="allowedDepartments" placeholder="Allowed Departments (comma separated)" onChange={handleChange} /><br />
        <input name="allowedYears" placeholder="Allowed Years (comma separated)" onChange={handleChange} /><br />
        <input name="overviewTermsCondition" placeholder="T&C URL" onChange={handleChange} /><br />

        <button type="submit">Add Company</button>
      </form>
    </div>
  );
};

export default AddCompany;
