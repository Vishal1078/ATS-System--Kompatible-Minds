const initialCandidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "9876543210",
    jobTitle: "Frontend Developer",
    status: "Active",
    noticePeriod: "30 days",
    recruiter: "Ankit",
    source: "LinkedIn",
    expectedSalary: "1200000",
  },
  // ...
];
export const getCandidates = () => {
  return initialCandidates;
};
