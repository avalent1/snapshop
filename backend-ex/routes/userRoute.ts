import express from 'express';
import {loginUser, registerUser, adminLogin, fetchAllUsers, getCurrentUser} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.get('/all', fetchAllUsers);
userRouter.get('/me', getCurrentUser);


export default userRouter;