import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const jobDbConfig = {
  user: process.env.JOB_DB_USER,
  password: process.env.JOB_DB_PASS,
  server: process.env.JOB_DB_SERVER,
  database: process.env.JOB_DB_NAME,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    enableArithAbort: true
  }
};

const poolPromise = new sql.ConnectionPool(jobDbConfig)
  .connect()
  .then(pool => {
    console.log('✅ Connected to Jobs SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('❌ Jobs DB Connection Failed:', err);
    throw err;
  });

// Alias so both names work
const jobPool = poolPromise;

export { sql, poolPromise, jobPool };
