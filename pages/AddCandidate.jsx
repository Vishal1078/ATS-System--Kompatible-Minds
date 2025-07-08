import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCandidate.css"; 

const AddCandidate = ({ onAdd }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "", status: "", noticePeriod: "",
    jobTitle: "", currentCompany: "", experience: "", education: "",
    recruiter: "", source: "", email: "", phone: "", address: "",
    currentSalary: "", expectedSalary: "", skills: "", tags: "", comments: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: Date.now(), ...formData });
    navigate("/candidates");
  };

  return (
    <div className="form-container">
      <div className="form-title">Add New Candidate</div>
      <form onSubmit={handleSubmit} className="form-grid">

        {/* Personal Info */}
        <div className="section-title">Personal Info</div>
        <div></div>

        <Input label="First Name *" name="firstName" onChange={handleChange} required />
        <Input label="Middle Name" name="middleName" onChange={handleChange} />
        <Input label="Last Name *" name="lastName" onChange={handleChange} required />
        <Select label="Status *" name="status" options={["New Lead", "Active", "Placed", "Drop Out", "Archive"]} onChange={handleChange} required />
        <Select label="Notice Period" name="noticePeriod" options={["15 days", "30 days", "40 days", "45 days", "60 days"]} onChange={handleChange} />
        <Input label="Current Job Title" name="jobTitle" onChange={handleChange} />
        <Input label="Current Company" name="currentCompany" onChange={handleChange} />
        <Input label="Experience (yrs)" name="experience" type="number" onChange={handleChange} />
        <Select label="Education" name="education" options={["B.Tech", "M.Tech", "B.Tech & M.Tech", "MBA"]} onChange={handleChange} />

        {/* Contact Info */}
        <div className="section-title">Contact Info</div>
        <div></div>

        <Select label="Recruiter *" name="recruiter" options={["Ankit", "Amala", "Nike"]} onChange={handleChange} required />
        <Select label="Source *" name="source" options={["Naukri", "LinkedIn", "Internal Reference"]} onChange={handleChange} required />
        <Input label="Email *" name="email" type="email" onChange={handleChange} required />
        <Input label="Phone Number *" name="phone" type="tel" onChange={handleChange} required />
        <Textarea label="Current Address" name="address" onChange={handleChange} />

        {/* Salary Info */}
        <div className="section-title">Salary Info</div>
        <div></div>

        <Input label="Current Annual Salary" name="currentSalary" type="number" onChange={handleChange} />
        <Input label="Expected Annual Salary" name="expectedSalary" type="number" onChange={handleChange} />

        {/* Skills & Notes */}
        <Input label="Skills" name="skills" onChange={handleChange} />
        <Input label="Tags" name="tags" onChange={handleChange} />
        <Textarea label="General Comments" name="comments" onChange={handleChange} />

        <div className="form-group" style={{ gridColumn: "span 2", textAlign: "right" }}>
          <button type="submit" className="submit-button">Add Candidate</button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, name, type = "text", onChange, required = false }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} name={name} onChange={onChange} required={required} />
  </div>
);

const Select = ({ label, name, options, onChange, required = false }) => (
  <div className="form-group">
    <label>{label}</label>
    <select name={name} onChange={onChange} required={required}>
      <option value="">-- Select --</option>
      {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const Textarea = ({ label, name, onChange }) => (
  <div className="form-group" style={{ gridColumn: "span 2" }}>
    <label>{label}</label>
    <textarea name={name} rows="3" onChange={onChange}></textarea>
  </div>
);

export default AddCandidate;
