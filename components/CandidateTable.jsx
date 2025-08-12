import React, { useState } from 'react';

// Styling constants
const tableStyle = { width: '100%', borderCollapse: 'collapse', fontSize: '14px' };
const thStyle = { backgroundColor: '#f2f2f2', padding: '12px', border: '1px solid #ddd', textTransform: 'uppercase', color: '#333' };
const tdStyle = { padding: '10px', border: '1px solid #ddd' };
const rowHover = { cursor: 'pointer' };

const CandidateTable = ({ candidates = [], setCandidates }) => {
  // ✅ Filter state hooks
  const [jobTitle, setJobTitle] = useState('');
  const [nameTerm, setNameTerm] = useState('');
  const [contactTerm, setContactTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [skillsTerm, setSkillsTerm] = useState('');
  const [resumeTerm, setResumeTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Helper to parse date
  const parseDate = (v) => (v ? new Date(v) : null);

  const filtered = candidates.filter(c => {
    // Name match
    const fullName = `${c.firstName} ${c.middleName || ''} ${c.lastName}`.toLowerCase();
    if (nameTerm && !fullName.includes(nameTerm.toLowerCase())) return false;

    // Contact match
    if (contactTerm && !(
      c.email?.toLowerCase().includes(contactTerm.toLowerCase()) ||
      c.phone?.includes(contactTerm)
    )) return false;

    // Job Title
    if (jobTitle && c.jobTitle !== jobTitle) return false;

    // Status
    if (statusFilter && c.status !== statusFilter) return false;

    // Source
    if (sourceFilter && c.source !== sourceFilter) return false;

    // Location
    if (locationFilter && c.location !== locationFilter) return false;

    // Experience
    if (minExperience && +(c.experience || 0) < +minExperience) return false;

    // Skills
    if (skillsTerm) {
      const skills = (c.skills || '').toLowerCase();
      if (!skills.includes(skillsTerm.toLowerCase())) return false;
    }

    // Resume keywords
    if (resumeTerm) {
      const resume = (c.comments || '').toLowerCase();
      if (!resume.includes(resumeTerm.toLowerCase())) return false;
    }

    // Date Added: assuming c.dateAdded is ISO string
    if ((dateFrom || dateTo) && c.dateAdded) {
      const da = new Date(c.dateAdded);
      if (dateFrom && da < parseDate(dateFrom)) return false;
      if (dateTo && da > parseDate(dateTo)) return false;
    }

    return true;
  });

  // dropdown options
  const jobOptions = [...new Set(candidates.map(c => c.jobTitle).filter(Boolean))];
  const statusOptions = [...new Set(candidates.map(c => c.status).filter(Boolean))];
  const sourceOptions = [...new Set(candidates.map(c => c.source).filter(Boolean))];
  const locationOptions = [...new Set(candidates.map(c => c.location).filter(Boolean))];

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/candidates/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCandidates(prev => prev.filter(c => c.id !== id));
        alert('Candidate deleted successfully.');
      } else alert('Failed to delete candidate.');
    } catch (err) {
      console.error(err);
      alert('Error deleting candidate.');
    }
  };

  return (
    <div style={{ padding: '30px', background: '#f9f9f9', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Candidates</h2>
        <a href="/add-candidate" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '10px 16px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
          + Add Candidate
        </a>
      </div>

      {/* ✅ Filter Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '12px', marginBottom: '20px' }}>
        <input placeholder="Name search..." value={nameTerm} onChange={e => setNameTerm(e.target.value)} />
        <input placeholder="Email or phone..." value={contactTerm} onChange={e => setContactTerm(e.target.value)} />
        <select value={jobTitle} onChange={e => setJobTitle(e.target.value)}>
          <option value="">All Job Titles</option>
          {jobOptions.map((j,i) => <option key={i}>{j}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Status (All)</option>
          {statusOptions.map((s,i) => <option key={i}>{s}</option>)}
        </select>
        <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
          <option value="">Source (All)</option>
          {sourceOptions.map((s,i) => <option key={i}>{s}</option>)}
        </select>
        <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
          <option value="">Location (All)</option>
          {locationOptions.map((l,i) => <option key={i}>{l}</option>)}
        </select>
        <input type="number" placeholder="Min experience (years)" value={minExperience} onChange={e => setMinExperience(e.target.value)} />
        <input placeholder="Skills contains..." value={skillsTerm} onChange={e => setSkillsTerm(e.target.value)} />
        <input placeholder="Resume keywords..." value={resumeTerm} onChange={e => setResumeTerm(e.target.value)} />
        <div>
          <label>Date Added from:</label>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          <label>to:</label>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Job Title</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Source</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Experience</th>
              <th style={thStyle}>Date Added</th>
              <th style={thStyle}>Skills</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0
              ? <tr><td colSpan="12" style={{ ...tdStyle, textAlign: 'center' }}>No candidates found.</td></tr>
              : filtered.map(c => (
                <tr key={c.id} style={rowHover}>
                  <td style={tdStyle}>{c.id}</td>
                  <td style={tdStyle}>{`${c.firstName} ${c.middleName || ''} ${c.lastName}`}</td>
                  <td style={tdStyle}>{c.email}</td>
                  <td style={tdStyle}>{c.phone}</td>
                  <td style={tdStyle}>{c.jobTitle}</td>
                  <td style={tdStyle}>{c.status}</td>
                  <td style={tdStyle}>{c.source}</td>
                  <td style={tdStyle}>{c.location}</td>
                  <td style={tdStyle}>{c.experience}</td>
                  <td style={tdStyle}>{c.dateAdded?.slice(0,10)}</td>
                  <td style={tdStyle}>{c.skills}</td>
                  <td style={tdStyle}>
                    {c.status?.toLowerCase() === 'rejected' ? (
                      <button onClick={() => handleDelete(c.id)} style={{ backgroundColor: '#e74c3c', color: '#fff', padding: '6px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                    ) : <span>—</span>}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateTable;
