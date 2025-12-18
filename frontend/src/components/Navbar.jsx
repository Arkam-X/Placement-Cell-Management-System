import { Link } from "react-router-dom";
import "./../styles/landing.css";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar-glass">
        <div className="nav-left">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-right">
          <Link to="/register" className="signup-btn">
            Sign Up
          </Link>
          <Link to="/login" className="signup-btn">
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
