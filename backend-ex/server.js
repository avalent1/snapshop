import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './config/database.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

// app config

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
connectCloudinary();

// middleware

app.use(express.json());
app.use(cors()); //we can access the API from anywhere, any ip address

app.use('/api/user', userRouter)

// api endpoints
app.get('/', (req, res) => {
    res.send("API working")
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});