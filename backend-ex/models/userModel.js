import db from '../config/database.js';

export const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // returns first matching user or undefined
};

export const insertUser = async (name, email, hashedPassword) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );
  return result.insertId; // Returns the ID of the new user
};

export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT id, name, email FROM users'); // exclude password!
  return rows;
};

