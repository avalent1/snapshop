import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// app config

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

// middleware

app.use(express.json());
app.use(cors()); //we can access the API from anywhere, any ip address

// api endpoints
app.get('/', (req, res) => {
  res.status(200).send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});