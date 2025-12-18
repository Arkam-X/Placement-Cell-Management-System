import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TPODashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>TPO Dashboard</h2>
      <nav>
        <Link to="/tpo/add-company">Add Company</Link>
        <br />
         <Link to="/tpo/companies">View Companies</Link>
         <br />
         <Link to="/tpo/students">View Students</Link>
         <br />
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
};

export default TPODashboard;
