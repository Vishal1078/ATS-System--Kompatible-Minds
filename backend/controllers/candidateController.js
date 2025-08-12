// backend/controllers/candidateController.js
import { poolPromise, sql } from '../config/db.js';

export const addCandidate = async (req, res) => {
  try {
    const {
      firstName, middleName, lastName, status, noticePeriod,
      jobTitle, currentCompany, experience, education, recruiter,
      source, email, phone, address, currentSalary,
      expectedSalary, skills, tags, comments
    } = req.body;

    const pool = await poolPromise;
    await pool.request()
      .input('firstName', sql.VarChar, firstName)
      .input('middleName', sql.VarChar, middleName)
      .input('lastName', sql.VarChar, lastName)
      .input('status', sql.VarChar, status)
      .input('noticePeriod', sql.VarChar, noticePeriod)
      .input('jobTitle', sql.VarChar, jobTitle)
      .input('currentCompany', sql.VarChar, currentCompany)
      .input('experience', sql.Int, experience)
      .input('education', sql.VarChar, education)
      .input('recruiter', sql.VarChar, recruiter)
      .input('source', sql.VarChar, source)
      .input('email', sql.VarChar, email)
      .input('phone', sql.VarChar, phone)
      .input('address', sql.VarChar, address)
      .input('currentSalary', sql.Int, currentSalary)
      .input('expectedSalary', sql.Int, expectedSalary)
      .input('skills', sql.VarChar, skills)
      .input('tags', sql.VarChar, tags)
      .input('comments', sql.Text, comments)
      .query(`
        INSERT INTO Candidates (
          firstName, middleName, lastName, status, noticePeriod,
          jobTitle, currentCompany, experience, education, recruiter,
          source, email, phone, address, currentSalary,
          expectedSalary, skills, tags, comments
        ) VALUES (
          @firstName, @middleName, @lastName, @status, @noticePeriod,
          @jobTitle, @currentCompany, @experience, @education, @recruiter,
          @source, @email, @phone, @address, @currentSalary,
          @expectedSalary, @skills, @tags, @comments
        )
      `);

    res.status(201).json({ message: 'Candidate added successfully' });
  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get all candidates
export const getCandidates = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Candidates');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
