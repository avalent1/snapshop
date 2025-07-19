import { Request, Response } from 'express';
import { findUserByEmail, insertUser, getAllUsers, getUserById } from '../models/userModel';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (id: number): string => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await findUserByEmail(email);
    console.log(user)

    if (!user) {
      res.json({ success: false, message: 'User does not exist' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password || '');

    if (isMatch) {
      const token = createToken(user.id)
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Ugh... something went wrong. Maybe invalid credentials?' });
    }
  } catch (error: any) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password }: { name: string; email: string; password: string } = req.body;

    const exists = await findUserByEmail(email);
    if (exists) {
      res.status(409).json({ success: false, message: 'User already exists' });
      return;
    }

    if (!validator.isEmail(email)) {
      res.json({ success: false, message: 'Please enter a valid email' });
      return;
    }

    if (password.length < 8) {
      res.json({ success: false, message: 'Please enter a strong password' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const userId = await insertUser(name, email, hashedPass);

    const token = createToken(userId);
    res.status(201).json({ success: true, message: 'User registered', userId, token });

  } catch (error: any) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, password }: {email: string; password: string } = req.body;
    console.log("Body: ", req.body)
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
      const secret = process.env.JWT_SECRET;

      if (typeof secret !== 'string') {
        res.status(500).json({ success: false, message: 'JWT_SECRET is not configured' });
        return;
      }

      const token = jwt.sign({ email }, secret);
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Assuming authenticate middleware sets req.user from token
    const userId = req.body.user.id;
    const user = await getUserById(userId); // You implement this function
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};