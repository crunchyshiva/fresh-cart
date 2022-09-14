const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express('');
dotenv.config({ path: './config.env' });
require('../server/db/conn');

const PORT = process.env.PORT;
app.use(cors({ origin : '*'}));
app.use(express.json());
app.use(require('./router/Order'));
app.use(require('./router/auth'));

// app.get('/about', middleware, (req, res) => {
//   console.log('Hello my about');
//   res.send('hello about worlds from the server');
// });

// app.get('/contact', (req, res) => {
//   // res.cookie("Test","shivam");
//   res.send('hello contact worlds from the server');
// });

app.listen(PORT, () => {
  console.log(`server is running port number ${PORT}`);
});
