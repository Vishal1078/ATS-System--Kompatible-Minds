import React, { useState } from "react";
import "./clientForm.css";

const ClientForm = ({ onClientAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    createdDate: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/clients/add-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to add client');
      }

      alert('✅ Client added successfully!');
      setFormData({
        name: '',
        contactName: '',
        email: '',
        phone: '',
        createdDate: new Date().toISOString().slice(0, 10),
      });

      if (onClientAdded) {
        onClientAdded(); // Optional callback to refresh list
      }
    } catch (err) {
      console.error('Error adding client:', err);
      alert('❌ Error adding client');
    }
  };

  return (
    <div className="client-form-container">
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit} className="client-form">
        <label>
          Client Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Contact Name:
          <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Created Date:
          <input type="date" name="createdDate" value={formData.createdDate} disabled />
        </label>

        <button type="submit">Submit Client</button>
      </form>
    </div>
  );
};

export default ClientForm;
