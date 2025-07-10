import React ,{useState} from "react";


const JobPage =() =>{
    const [jobData, setJobData] = useState({
    title: "",
    Owner: "",
    AssignedRecruiter: "",
    ClientPOC:"",
    type: "",
    Status: "",
});
const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };
 const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Posted Job:", jobData);
    alert("Job Posted Successfully!");
    setJobData({
      title: "",
      Owner: "",
      AssignedRecruiter: "",
      ClientPOC: "",
      type: "",
      Status: "",
    });
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <h2 style={{ fontSize: "26px", marginBottom: "20px", color: "#333" }}>
        Post a New Job
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          maxWidth: "700px"
        }}
      >
        <Input label="Job Title" name="title" value={jobData.title} onChange={handleChange} />
        <Input label="Owner" name="Owner" value={jobData.Owner} onChange={handleChange} />
        <Input label="Assigned Recruiter" name="AssignedRecruiter" value={jobData.AssignedRecruiter} onChange={handleChange} />
        <Input label="Client POC" name="ClientPOC" value={jobData.ClientPOC} onChange={handleChange} />
        <Select
          label="Type"
          name="type"
          value={jobData.type}
          options={["Freelance", "Permanent", "Internship"]}
          onChange={handleChange}
        />
        <Select
          label="Status"
          name="Status"
          value={jobData.Status}
          options={["Open","On Hold","Negotiating","Qualifying","Signing","Closed"]}
          onChange={handleChange}
        />
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              background: "#4CAF50",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px"
      }}
      required
    />
  </div>
);

// Reusable Textarea Component
const Textarea = ({ label, name, value, onChange }) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      style={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px"
      }}
      required
    />
  </div>
);

// Reusable Select Component
const Select = ({ label, name, value, options, onChange }) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px"
      }}
      required
    >
      <option value="">-- Select --</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default JobPage;


