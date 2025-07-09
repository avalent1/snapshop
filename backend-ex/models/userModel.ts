import sequelize from '../config/database'; 
import { QueryTypes } from 'sequelize';
import { Cart } from './cartModel';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  cart_data: Cart[];
}

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const users = await sequelize.query<User>(
    'SELECT * FROM users WHERE email = ?',
    {
      replacements: [email],
      type: QueryTypes.SELECT,
    }
  );
  return users[0];
};

export const insertUser = async (
  name: string,
  email: string,
  hashedPassword: string
): Promise<number> => {
  const result = await sequelize.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    {
      replacements: [name, email, hashedPassword],
      type: QueryTypes.INSERT,
    }
  );

  // result[0] is the insertId in MySQL
  return (result as any)[0]; // sequelize.query has a loose return type for INSERT
};

export const getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
  const users = await sequelize.query<Omit<User, 'password'>>(
    'SELECT id, name, email FROM users',
    {
      type: QueryTypes.SELECT,
    }
  );
  return users;
};
