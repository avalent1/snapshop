import express from 'express';
import 'dotenv/config';
import connectCloudinary from './config/cloudinary';
import userRouter from './routes/userRoute';
import productRouter from './routes/productRoute';
import cors from 'cors';
import cartRouter from './routes/cartRoute';

// app config

const app = express();
const PORT = process.env.PORT || 4000;
connectCloudinary();

// middleware

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
 //we can access the API from anywhere, any ip address

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)


app.get('/', (req, res) => {
    res.send("API working")
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});