import React from "react";

const CandidateTable = ({ candidates = [] }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Candidates</h2>
      <div className="overflow-x-auto shadow rounded">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Job Title</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{candidate.id}</td>
                <td className="py-2 px-4 border-b">{candidate.name}</td>
                <td className="py-2 px-4 border-b">{candidate.email}</td>
                <td className="py-2 px-4 border-b">{candidate.phone}</td>
                <td className="py-2 px-4 border-b">{candidate.jobTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateTable;
