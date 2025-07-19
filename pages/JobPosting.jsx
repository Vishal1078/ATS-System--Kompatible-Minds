import React, { useEffect, useState } from "react";

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("https://your-backend-api.com/jobs"); // Update this with your real endpoint
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleApply = (jobId, title) => {
    // Redirect to application page or show a modal
    alert(`You have applied for: ${title} (Job ID: ${jobId})`);
    // Or navigate(`/apply/${jobId}`);
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ fontSize: "26px", marginBottom: "20px", color: "#333" }}>
        All Job Listings
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {jobs.map((job) => (
          <div
            key={job._id}
            style={{
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#222" }}>
                {job.title}
              </h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Status:</strong> {job.Status}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Start Date:</strong> {job.startDate}</p>
              <p><strong>Experience:</strong> {job.minExperienceRequired} - {job.maxExpeirienceRequired} yrs</p>
              <p><strong>Work Mode:</strong> {job.workMode}</p>

              {job.attachJD && (
                <a
                  href={job.attachJD}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#4CAF50",
                    fontWeight: "bold",
                    marginTop: "10px",
                    display: "inline-block",
                  }}
                >
                  📎 View JD
                </a>
              )}
            </div>

            <button
              onClick={() => handleApply(job._id, job.title)}
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListingPage;
