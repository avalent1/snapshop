import mysql from 'mysql2/promise'

const db = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'snapshop',
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed: ', err.message);
    process.exit(1);
  }
  console.log('MySQL connected');
});

export default db;
