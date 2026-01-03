import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth/login.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);

      if (!res?.success) {
        throw new Error("Invalid response");
      }

      const { user, token } = res.data;
      login(user, token);

      if (user.role === "TPO") {
        navigate("/tpo");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="login-input"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="login-input"
        />

        <button
          type="submit"
          disabled={loading}
          className="login-button"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="login-register">
        New student?{" "}
        <Link to="/register" className="login-link">
          Register here
        </Link>
      </p>
    </div>
    </div>
  );
};

export default Login;
