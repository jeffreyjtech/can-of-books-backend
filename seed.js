'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book.js');

async function seed(){

  /* Book schema
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true},
  email: {type: String, required: true}
  */
  await Book.create({
    title: 'Catcher in the Rye',
    description: 'idk man',
    status: 'read',
    email: 'jeffreyjtech@gmail.com'
  });

  console.log('"Catcher in the Rye" has been added');

  await Book.create({
    title: 'Fahrenheit 451',
    description: 'idk man',
    status: 'read',
    email: 'jeffreyjtech@gmail.com'
  });

  console.log('"Fahrenheit 451" has been added');

  await Book.create({
    title: 'Project Hail Mary',
    description: 'SciFi',
    status: 'not read',
    email: 'mattrangel@gmail.com'
  });

  mongoose.disconnect();
}

seed();
