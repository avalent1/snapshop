import express from 'express';
import 'dotenv/config';
import connectCloudinary from './config/cloudinary';
import userRouter from './routes/userRoute';
import productRouter from './routes/productRoute';
import cors from 'cors';
import sequelize from './config/database'; // Adjust the path to your actual sequelize instance

// app config

const app = express();
const PORT = process.env.PORT || 4000;
connectCloudinary();

// middleware

app.use(express.json());
app.use(cors())
 //we can access the API from anywhere, any ip address

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.get('/', (req, res) => {
    res.send("API working")
});

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database synced.");

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to sync DB:", err);
});