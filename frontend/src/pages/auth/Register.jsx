import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth/register.css";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    prn: "",
    year: "",
    cgpa: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await registerUser({
        ...form,
        role: "STUDENT",
      });

      // Redirect after successful registration
      if (res.success && res.data?.token) {
        login(res.data.user, res.data.token);
        navigate("/student");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Student Registration</h2>

        {error && <p className="register-error">{error}</p>}

        <form onSubmit={handleSubmit} className="register-form">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="register-input"
          />

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="register-select"
          >
            <option value="">Select Department</option>
            <option value="AIML">AIML</option>
            <option value="IOT">IOT</option>
            <option value="IT">IT</option>
            <option value="CE">CE</option>
            <option value="MECH">MECH</option>
            <option value="EXTC">EXTC</option>
          </select>

          <input
            name="prn"
            placeholder="PRN (6 digits)"
            value={form.prn}
            onChange={handleChange}
            required
            className="register-input"
          />

          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            required
            className="register-select"
          >
            <option value="">Select Year</option>
            <option value="FE">FE</option>
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select>

          <input
            name="cgpa"
            type="number"
            step="0.01"
            min="0"
            max="10"
            placeholder="CGPA"
            value={form.cgpa}
            onChange={handleChange}
            required
            className="register-input"
          />

          <button
            type="submit"
            disabled={loading}
            className="register-button"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
