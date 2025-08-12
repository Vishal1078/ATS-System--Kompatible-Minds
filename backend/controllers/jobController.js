import sql from 'mssql';
import { jobPool } from '../config/jobdb.js';
import uploadToAzure from '../utils/azureBlob.js';

export const createJob = async (req, res) => {
  try {
    const {
      title,
      Owner,
      AssignedRecruiter,
      ClientPOC,
      type,
      Status,
      numberOfPositions,
      startDate,
      expectedEndDate,
      actualEndDate,
      workMode,
      location,
      jobDescription,
      minExperienceRequired,
      maxExperienceRequired
    } = req.body;

    const attachJDFile = req.file;

    let attachJDName = null;
    let attachJDUrl = null;

    if (attachJDFile) {
      attachJDName = attachJDFile.originalname;
      attachJDUrl = await uploadToAzure(attachJDFile);
    }

    const pool = await jobPool;
    const request = pool.request()
      .input('title', sql.VarChar(255), title)
      .input('Owner', sql.VarChar(255), Owner)
      .input('AssignedRecruiter', sql.VarChar(255), AssignedRecruiter)
      .input('ClientPOC', sql.VarChar(255), ClientPOC)
      .input('type', sql.VarChar(100), type)
      .input('Status', sql.VarChar(100), Status)
      .input('numberOfPositions', sql.Int, numberOfPositions)
      .input('startDate', sql.Date, startDate ? new Date(startDate) : null)
      .input('expectedEndDate', sql.Date, expectedEndDate ? new Date(expectedEndDate) : null)
      .input('actualEndDate', sql.Date, actualEndDate ? new Date(actualEndDate) : null)
      .input('workMode', sql.VarChar(100), workMode)
      .input('location', sql.VarChar(255), location)
      .input('jobDescription', sql.Text, jobDescription)
      .input('minExperienceRequired', sql.Int, minExperienceRequired)
      .input('maxExperienceRequired', sql.Int, maxExperienceRequired);

    // Removed attachJDName and attachJDUrl from the query due to schema mismatch
    await request.query(`
      INSERT INTO Jobs (
        title, Owner, AssignedRecruiter, ClientPOC, type, Status,
        numberOfPositions, startDate, expectedEndDate, actualEndDate,
        workMode, location, jobDescription, minExperienceRequired,
        maxExperienceRequired
      ) VALUES (
        @title, @Owner, @AssignedRecruiter, @ClientPOC, @type, @Status,
        @numberOfPositions, @startDate, @expectedEndDate, @actualEndDate,
        @workMode, @location, @jobDescription, @minExperienceRequired,
        @maxExperienceRequired
      )
    `);

    res.status(201).json({ 
      message: 'Job created successfully',
      attachJDName, // Return file details if uploaded
      attachJDUrl 
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const pool = await jobPool;
    const result = await pool.request().query('SELECT * FROM Jobs ORDER BY createdAt DESC');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const pool = await jobPool;
    const result = await pool.request()
      .input('id', sql.Int, jobId)
      .query('SELECT * FROM Jobs WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};