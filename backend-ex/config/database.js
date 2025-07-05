"use strict";
/*import mysql from 'mysql2/promise'

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

export default db; */
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: { max: 5, min: 0, idle: 10000 },
});
exports.default = sequelize;
