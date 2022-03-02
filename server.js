'use strict';

// Assigning packages with require
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// Middle ware
const app = express();
app.use(cors());

app.use(express.json());

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

app.post('/books', postBook);
app.delete('/books/:id', deleteBook);

async function getBooks(req, res, next) {
  try {
    // let queryObject = {email: req.query.email || 'j-d-salinger@email.scam'};

    // Here we're using our Book model for a mongoose query (.find())
    let results = await Book.find();
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postBook(req, res, next) {
  try {
    await Book.validate(...req.body);

    let createdBook = await Book.create(req.body);

    res.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  let id = req.params.id;
  console.log(id);
  try {
    await Book.findByIdAndDelete(id);

    res.status(200).send('Book Deleted!');
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
  res.status(error.status || 500).send(error.message || 'Unknown error');
});

app.listen(PORT, () => console.log('listening on port: ', PORT));
