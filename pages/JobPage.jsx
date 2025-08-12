import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";

const JobPage = () => {
  const [jobData, setJobData] = useState({
    title: "",
    Owner: "",
    AssignedRecruiter: "",
    ClientPOC: "",
    type: "",
    Status: "",
    numberOfPositions: "",
    startDate: "",
    expectedEndDate: "",
    actualEndDate: "",
    workMode: "",
    location: "",
    jobDescription: "",
    minExperienceRequired: "",
    maxExperienceRequired: "",
    attachJD: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in jobData) {
      if (key === "attachJD" && jobData.attachJD) {
        formData.append("attachJD", jobData.attachJD); // ✅ Fix here
      } else if (key !== "attachJD") {
        formData.append(key, jobData[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/jobs/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("✅ Job Posted Successfully!");
        setJobData({
          title: "",
          Owner: "",
          AssignedRecruiter: "",
          ClientPOC: "",
          type: "",
          Status: "",
          numberOfPositions: "",
          startDate: "",
          expectedEndDate: "",
          actualEndDate: "",
          workMode: "",
          location: "",
          jobDescription: "",
          minExperienceRequired: "",
          maxExperienceRequired: "",
          attachJD: null,
        });
      } else {
        alert("❌ Failed to post job. Try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("🚨 Error occurred while posting the job.");
    }
  };

  return (
    <div style={{ padding: "30px", background: "#f5f5f5", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "26px", marginBottom: "20px" }}>Post a New Job</h2>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", maxWidth: "700px" }}>
        <Input label="Job Title" name="title" value={jobData.title} onChange={handleChange} />
        <Input label="Owner" name="Owner" value={jobData.Owner} onChange={handleChange} />
        <Input label="Assigned Recruiter" name="AssignedRecruiter" value={jobData.AssignedRecruiter} onChange={handleChange} />
        <Input label="Client POC" name="ClientPOC" value={jobData.ClientPOC} onChange={handleChange} />
        <Select label="Type" name="type" value={jobData.type} options={["Freelance", "Permanent", "Internship"]} onChange={handleChange} />
        <Select label="Status" name="Status" value={jobData.Status} options={["Open", "On Hold", "Negotiating", "Qualifying", "Signing", "Closed"]} onChange={handleChange} />
        <Input label="Number of Positions" name="numberOfPositions" value={jobData.numberOfPositions} onChange={handleChange} type="number" />
        <Input label="Start Date" name="startDate" value={jobData.startDate} onChange={handleChange} type="date" />
        <Input label="Expected End Date" name="expectedEndDate" value={jobData.expectedEndDate} onChange={handleChange} type="date" />
        <Input label="Actual End Date" name="actualEndDate" value={jobData.actualEndDate} onChange={handleChange} type="date" />
        <Select label="Work Mode" name="workMode" value={jobData.workMode} options={["Remote", "Hybrid", "Work from Office"]} onChange={handleChange} />
        <Input label="Location" name="location" value={jobData.location} onChange={handleChange} />
        <Input label="Job Description" name="jobDescription" value={jobData.jobDescription} onChange={handleChange} />
        <Input label="Minimum Experience Required (Yrs)" name="minExperienceRequired" value={jobData.minExperienceRequired} onChange={handleChange} />
        <Input label="Maximum Experience Required (Yrs)" name="maxExperienceRequired" value={jobData.maxExperienceRequired} onChange={handleChange} />

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Attach JD (PDF or DOC)</label>
          <Label
            htmlFor="dropzone-file"
            className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center py-5">
              <svg className="mb-3 h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 70 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021 4 4 0 0 0 5 13h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-400">PDF or DOC only (Max: 5MB)</p>
              {jobData.attachJD && <p className="mt-2 text-sm text-green-600 font-medium">Selected: {jobData.attachJD.name}</p>}
            </div>
            <FileInput id="dropzone-file" name="attachJD" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setJobData((prev) => ({ ...prev, attachJD: file }));
              }
            }} />
          </Label>
        </div>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button type="submit" style={{ background: "#4CAF50", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Input
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} required />
  </div>
);

// Reusable Select
const Select = ({ label, name, value, options, onChange }) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>{label}</label>
    <select name={name} value={value} onChange={onChange} style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} required>
      <option value="">-- Select --</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default JobPage;
