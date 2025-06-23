import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './config/database.js';
import connectCloudinary from './config/cloudinary.js';

// app config

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
connectCloudinary();

// middleware

app.use(express.json());
app.use(cors()); //we can access the API from anywhere, any ip address

// api endpoints
/*app.get('/', (req, res) => {
    db.query("INSERT INTO users (name, email, password) VALUES ('Testing', '123', 'test1')", (err, result) => {
      if (err){
        console.log(err)
      }
      else{
        console.log(result);
        res.status(200).send("Data inserted successfully");
      }
})
});
*/

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});