
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/routes.js';

dotenv.config();
const app = express();
const PORT = 5000;

// // Cors options 
// const corsOptions = { exposedHeaders: ['game-token'] };

app.use(cors());
app.use(express.json());
app.use('/', routes);
// app.use('/uploads', express.static('uploads'));

//Database
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Server is running on port: ${PORT}`);
    app.listen(PORT);
  });


