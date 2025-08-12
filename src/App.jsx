import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import CandidateTable from "../components/CandidateTable";
import HomePage from "../pages/HomePage";
import AddCandidate from "../pages/AddCandidate";
import JobPage from "../pages/JobPage";
import JobPosting from "../pages/JobPosting";
import ClientsPage from "../pages/ClientsPage";

import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);

  // Fetch candidates from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/candidates")
      .then((res) => {
        setCandidates(res.data);
      })
      .catch((err) => {
        console.error("Error fetching candidates:", err);
      });
  }, []);

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
            <Route
              path="/candidates"
              element={<CandidateTable candidates={candidates} />}
            />
            <Route
              path="/add-candidate"
              element={<AddCandidate onAdd={addCandidate} />}
            />
            <Route path="/jobs/add" element={<JobPage />} />
            <Route path="/JobPosting" element={<JobPosting />} />
            <Route path="/clients" element={<ClientsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
