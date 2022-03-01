'use strict';

// Assigning packages with require
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// Middle ware
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

// Require-in our Book model
const Book = require('./models/book.js');

mongoose.connect(process.env.DB_URL);

// Test of life codeblock for checking our DB connection is good.
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// ----ROUTES----
app.get('/books', getBooks);

async function getBooks(req, res, next){
  try {
    // let queryObject = {email: req.query.email || 'j-d-salinger@email.scam'};

    // Here we're using our Book model for a mongoose query (.find())
    let results = await Book.find();
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

app.get('/test', (request, response) => {

  response.send('test request received');

});


app.get('/', (req, res) => {
  res.status(200).send('The API is happy and alive.');
});

app.get('*', (req, res) => {
  res.status(404).send('You goofed.');
});

// Express error catcher
app.use((error, req, res, next) => { // eslint-disable-line
  res.status(error.status).send('You goofed.');
});

app.listen(PORT, () => console.log('listening on port: ',PORT));
