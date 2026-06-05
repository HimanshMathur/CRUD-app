const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    publishDate: {
        type: String,
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };