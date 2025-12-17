import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Student Dashboard</h2>

      <nav>
        <Link to="/student/companies">Companies</Link>
        <br />
        <Link to="/student/applications">My Applications</Link>
        <br />
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
};

export default StudentDashboard;
