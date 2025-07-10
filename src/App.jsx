import React ,{useState} from 'react';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import CandidateTable from '../components/CandidateTable';
import HomePage from '../pages/HomePage';
import AddCandidate from '../pages/AddCandidate';
import JobPage from '../pages/JobPage';
import jobPosting from '../pages/jobPosting';

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
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
      <div style={{ flex: 1, minHeight: '100vh', padding: 0, backgroundColor: '#f9fafb' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/candidates" element={<CandidateTable candidates={candidates} />} />
            <Route path="/add-candidate" element={<AddCandidate onAdd={addCandidate} />} />
            <Route path="/jobs" element={<JobPage />} />
            <Route path="/jobPosting" element={<jobPosting />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
