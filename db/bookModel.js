/**
 * Define bookSchema and bookModel
 */
const mongoose = require('./mongoose');

//  Define the Book schema
const bookSchema = new mongoose.Schema({
    
    // Implement bookSchema
    title: { type: String, required: true },
    author: { type: String, required: true },
    year : { type: Number, required: true },
    category: { type: String, required: true, enum: ['NOVEL', 'TEXTBOOK', 'PHILOSOPHY'] },
    description: { type: String, required: true },
    image : { type: String, required: true },

});

const readingListSchema = new mongoose.Schema({
    // Implement readingListSchema
    name: { type: String, required: true },
    books: { type: [bookSchema], required: true },
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);
// Create readingList model
const ReadingList = mongoose.model('ReadingList', readingListSchema);

module.exports = { ReadingList, Book };
