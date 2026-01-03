// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { loginUser } from "../../api/auth.api";
// // import { useAuth } from "../../context/AuthContext";


// // const Login = () => {
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       const res = await loginUser(form);

// //       if (res.success) {
// //         login(res.data.user, res.data.token);

// //         if (res.data.user.role === "TPO") {
// //           navigate("/tpo");
// //         } else {
// //           navigate("/student");
// //         }
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Login failed");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       <form onSubmit={handleSubmit}>
// //         <input
// //           name="email"
// //           placeholder="Email"
// //           value={form.email}
// //           onChange={handleChange}
// //         />
// //         <br />

// //         <input
// //           name="password"
// //           type="password"
// //           placeholder="Password"
// //           value={form.password}
// //           onChange={handleChange}
// //         />
// //         <br />

// //         <button type="submit">Login</button>
// //       </form>
// //       <p style={{ marginTop: "10px" }}>
// //         New student?{" "}
// //         <Link to="/register" style={{ color: "blue" }}>
// //          Register here
// //         </Link>
// //       </p>
// //     </div>
// //   );
// // };

// // export default Login;

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../../api/auth.api";
// import { useAuth } from "../../context/AuthContext";

// const styles = {
//   container: {
//     maxWidth: "360px",
//     margin: "100px auto",
//     padding: "30px",
//     borderRadius: "16px",
//     boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//     background: "#fff",
//     textAlign: "center",
//   },
//   title: {
//     marginBottom: "20px",
//     color: "#3D52A0",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     padding: "10px",
//     borderRadius: "10px",
//     border: "none",
//     background: "#0FA4AF",
//     color: "#fff",
//     fontWeight: "600",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     marginBottom: "10px",
//   },
//   link: {
//     color: "#3D52A0",
//     textDecoration: "none",
//     fontWeight: "500",
//   },
// };


// const Login = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await loginUser(form);

//       if (!res?.success) {
//         throw new Error("Invalid response");
//       }

//       const { user, token } = res.data;

//       // Save to global auth context
//       login(user, token);

//       // Role-based redirect
//       if (user.role === "TPO") {
//         navigate("/tpo");
//       } else {
//         navigate("/student");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "Login failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Login</h2>

//       {error && <p style={styles.error}>{error}</p>}

//       <form onSubmit={handleSubmit} style={styles.form}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           style={styles.input}
//         />

//         <button type="submit" disabled={loading} style={styles.button}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <p style={{ marginTop: "14px" }}>
//         New student?{" "}
//         <Link to="/register" style={styles.link}>
//           Register here
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

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
