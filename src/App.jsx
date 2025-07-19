import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import CandidateTable from '../components/CandidateTable';
import HomePage from '../pages/HomePage';
import AddCandidate from '../pages/AddCandidate';
import JobPage from '../pages/JobPage';
import JobPosting from '../pages/JobPosting';
import ClientsPage from '../pages/ClientsPage';

import './App.css'; // ✅ Make sure this contains layout styles

const initialCandidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    jobTitle: "Frontend Developer",
  },
  {
    id: 2,
    name: "Aisha Khan",
    email: "aisha@example.com",
    phone: "9123456789",
    jobTitle: "Backend Engineer",
  },
];

function App() {
  const [candidates, setCandidates] = useState(initialCandidates);

  const addCandidate = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/candidates" element={<CandidateTable candidates={candidates} />} />
            <Route path="/add-candidate" element={<AddCandidate onAdd={addCandidate} />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/JobPosting" element={<JobPosting />} />
            <Route path="/clients" element={<ClientsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
