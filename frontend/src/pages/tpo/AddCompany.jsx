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
      allowedDepartments: form.allowedDepartments.split(/[, ]+/).map(d => d.trim()).filter(Boolean),
      allowedYears: form.allowedYears.split(/[, ]+/).map(y => y.trim()).filter(Boolean)
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
        <select name="jobType" onChange={handleChange}>
          <option value="">Select Job Type</option>
          <option value="FULL TIME">FULL TIME</option>
          <option value="INTERNSHIP">INTERNSHIP</option>
        </select> <br />
        <input name="internshipDurationMonths" placeholder="Internship duration" onChange={handleChange} /><br />
        <input name="minimumCGPA" placeholder="Minimum CGPA" onChange={handleChange} /><br />
        <input name="criteria" placeholder="Criteria" onChange={handleChange} /><br />
        <input name="allowedDepartments" placeholder="AIML, IOT, IT, CE, MECH, CIVIL, EXTC" onChange={handleChange} /><br />
        <input name="allowedYears" placeholder="FE, SE, TE, BE" onChange={handleChange} /><br />
        <input name="overviewTermsCondition" placeholder="T&C URL" onChange={handleChange} /><br />

        <button type="submit">Add Company</button>
      </form>
    </div>
  );
};

export default AddCompany;
