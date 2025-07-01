import { findUserByEmail, insertUser, getAllUsers } from '../models/userModel.js';
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginUser = async (req, res) => {

}

const registerUser = async (req, res) => {
    
    try {
        const { name, email, password} = req.body;

        //checking existing user

        const exists = await findUserByEmail(email);
        if (exists) {
        return res.status(409).json({success:false, message: 'User already exists' });
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message: 'Please enter a valid email' });
        }
        if (password.length < 8) {
            return res.json({success:false, message: "Please enter a strong password"})
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const userId = await insertUser(name, email, hashedPass);

        res.status(201).json({ message: 'User registered', userId });

        const token = createToken(userId);

        res.json({success:true, token})


    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }

}

const adminLogin = async (req, res) => {

}

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export {loginUser, registerUser, adminLogin}