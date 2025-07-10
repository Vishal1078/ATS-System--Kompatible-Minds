import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Candidates", count: 24 },
    { label: "Open Jobs", count: 5 },
    { label: "Interviews Scheduled", count: 7 },
    { label: "Placements", count: 3 }
  ];

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    flex: "1",
    margin: "10px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s ease"
  };

  const handleCardHover = (e, hover) => {
    e.currentTarget.style.transform = hover ? "scale(1.03)" : "scale(1)";
    e.currentTarget.style.boxShadow = hover
      ? "0 4px 20px rgba(0,0,0,0.15)"
      : "0 2px 10px rgba(0,0,0,0.1)";
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f6fa",
        minHeight: "100vh"
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333"
        }}
      >
        Welcome to the ATS System Dashboard
      </h1>

      {/* Stats section */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ ...cardStyle, background: "red" }}>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>{stat.label}</h3>
            <p style={{ fontSize: "26px", fontWeight: "bold", color: "#1a73e8" }}>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Actions section */}
      <h2 style={{ fontSize: "22px", margin: "40px 0 20px", color: "#444" }}>Quick Actions</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div
          style={{ ...cardStyle }}
          onClick={() => navigate("/candidates")}
          onMouseEnter={(e) => handleCardHover(e, true)}
          onMouseLeave={(e) => handleCardHover(e, false)}
        >
          <h3>📋 View Candidates</h3>
          <p style={{ color: "#666" }}>Browse all added candidate records</p>
        </div>

        <div
          style={{ ...cardStyle }}
          onClick={() => navigate("/add-candidate")}
          onMouseEnter={(e) => handleCardHover(e, true)}
          onMouseLeave={(e) => handleCardHover(e, false)}
        >
          <h3>➕ Add New Candidate</h3>
          <p style={{ color: "#666" }}>Fill in candidate details and save</p>
        </div>

        <div
          style={{ ...cardStyle }}
          onClick={() => alert("Jobs Page Coming Soon")}
          onMouseEnter={(e) => handleCardHover(e, true)}
          onMouseLeave={(e) => handleCardHover(e, false)}
        >
          <h3>💼 Manage Jobs</h3>
          <p style={{ color: "#666" }}>Post or manage job listings</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
