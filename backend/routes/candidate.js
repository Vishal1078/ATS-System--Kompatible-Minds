import express from 'express';
import { poolPromise, sql } from '../config/db.js';

const router = express.Router();

// ✅ GET all candidates
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Candidates');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).send('Server error');
  }
});

// ✅ DELETE candidate by ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Candidates WHERE id = @id');
    res.status(200).send('Candidate deleted');
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).send('Server error');
  }
});

export default router;
