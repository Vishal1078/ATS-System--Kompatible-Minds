import express from 'express';
import { createJob, getAllJobs, getJobById } from '../controllers/jobController.js';
import uploadMiddleware from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// file + form: uses multer
router.post('/add', uploadMiddleware.single('attachJD'), (req, res, next) => {
  console.log('Received file:', req.file);
  next();
}, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);

export default router;
