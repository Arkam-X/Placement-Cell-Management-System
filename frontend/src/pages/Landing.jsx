import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/landing.css";

const phrases = [
  "Talents meet need",
  "Opportunities get served"
];

const Landing = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <h1>
          Welcome to Recruitment Portal
        </h1>

        <p className="subtitle">
          One solution for Placement Activities
        </p>

        <div className="animated-text">
          {phrases[index]}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <h2>Core Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>Centralized Placements</h3>
            <p>
              Replace WhatsApp-based communication with a structured,
              transparent placement system.
            </p>
          </div>

          <div className="feature-card">
            <h3>Student Dashboard</h3>
            <p>
              Apply to companies, track application status, and never miss
              opportunities.
            </p>
          </div>

          <div className="feature-card">
            <h3>TPO Management</h3>
            <p>
              Add companies, manage applicants, and control placement workflows
              with ease.
            </p>
          </div>

          <div className="feature-card">
            <h3>Secure & Role-Based</h3>
            <p>
              JWT authentication with role-based access for Students and TPOs.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <h2>About the Platform</h2>
        <p>
          This portal bridges the gap between students and recruiters by
          offering a transparent, efficient, and modern placement experience.
        </p>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
