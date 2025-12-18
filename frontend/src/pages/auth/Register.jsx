import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

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

      // OPTIONAL: auto-login after register
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
    <div>
      <h2>Student Registration</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        /><br />

        <input
          name="department"
          placeholder="AIML, IOT, IT, CE, MECH, EXTC"
          onChange={handleChange}
          required
        /><br />

        <input
          name="prn"
          placeholder="6 digits"
          onChange={handleChange}
          required
        /><br />

        <input
          name="year"
          placeholder="Year (e.g. THIRD)"
          onChange={handleChange}
          required
        /><br />

        <input
          name="cgpa"
          type="number"
          step="0.01"
          placeholder="CGPA"
          onChange={handleChange}
          required
        /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
