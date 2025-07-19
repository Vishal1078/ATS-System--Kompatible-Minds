import sql from 'mssql';

const config = {
  user: 'kmadmin',
  password: 'Kompatible#2025',
  server: 'atskm.database.windows.net',
  database: 'ats-system',
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

async function run() {
  try {
    const pool = await sql.connect(config);
    console.log(' Connected to Azure SQL Database!');

    const result = await pool.request().query(`
      INSERT INTO Candidates (name, email, phone, resume)
      VALUES ('Vishal Dixit', 'vishaldixit1602@gmail.com', '9876543210', 'Sample resume text here');
    `);

    console.log('Candidate inserted successfully!');
    console.log(result);

    await sql.close();
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

run();
