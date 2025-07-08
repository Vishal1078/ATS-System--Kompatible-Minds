import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{
      width: '220px',
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h2 style={{ fontSize: '20px', marginBottom: '30px' }}>ATS System</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/clients" style={{ color: 'white', textDecoration: 'none' }}>Clients</Link>
        <Link to="/jobs" style={{ color: 'white', textDecoration: 'none' }}>Jobs</Link>
        <Link to="/candidates" style={{ color: 'white', textDecoration: 'none' }}>Candidates</Link>
        <Link to="/settings" style={{ color: 'white', textDecoration: 'none' }}>Settings</Link>
        <Link to="/add-candidate" style={{ color: 'white', textDecoration: 'none' }}>Add Candidate</Link>

      </nav>
    </div>
  );
};

export default Sidebar;
