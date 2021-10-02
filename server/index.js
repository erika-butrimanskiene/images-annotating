require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

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
  .then((res) => {
    console.log(`Server is running on port: ${PORT}`);
    app.listen(PORT);
  });