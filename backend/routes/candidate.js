// backend/routes/candidateRoutes.js
import express from 'express';
import { addCandidate } from '../controllers/candidateController.js';

const router = express.Router();

router.post('/add', addCandidate);

export default router;
