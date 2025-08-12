import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { jobPool } from './config/jobdb.js'; // Added: Named import for jobPool
import candidateRoutes from './routes/candidate.js';
import jobRoutes from './routes/job.js';
import clientRoutes from './routes/clientRoute.js'; // Importing client routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/candidates', candidateRoutes);
app.use('/api/jobs', jobRoutes); // Mount point for job routes
app.use('/api/clients', clientRoutes); // Mount point for client routes

const PORT = process.env.PORT || 5000;

// Start server after database connection
async function startServer() {
  try {
    const pool = await jobPool; // Resolve the database connection promise
    console.log('✅ Database connected, starting server...');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server due to database connection:', err);
    process.exit(1);
  }
}

startServer();