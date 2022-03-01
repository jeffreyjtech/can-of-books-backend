'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema ({
  title: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true},
  email: {type: String, required: true}
});

// Create and assign the BookModel using the mongoose method .model() and our bookSchema
const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
