import express from 'express';
import { sql, poolPromise } from '../config/jobdb.js';

const router = express.Router();

router.post('/add-client', async (req, res) => {
  try {
    const { name, contactName, email, phone, createdDate } = req.body;
    const pool = await poolPromise;

    await pool.request()
      .input('Name', sql.NVarChar, name)
      .input('ContactName', sql.NVarChar, contactName)
      .input('Email', sql.NVarChar, email)
      .input('Phone', sql.NVarChar, phone)
      .input('CreatedDate', sql.Date, createdDate)
      .query(`
        INSERT INTO Clients (Name, ContactName, Email, Phone, CreatedDate)
        VALUES (@Name, @ContactName, @Email, @Phone, @CreatedDate)
      `);

    res.status(201).json({ message: 'Client added successfully' });
  } catch (error) {
    console.error('Error adding client:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM Clients ORDER BY CreatedDate DESC');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

export default router;
