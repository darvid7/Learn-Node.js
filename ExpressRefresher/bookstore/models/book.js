/**
 * Created by David on 29/07/2016.
 */
var mongoose = require("mongoose");

// Genre Schema
var bookSchema = mongoose.Schema({
    // pass in fields here
    // so book will have a title, author..etc
    title:{
        // type and required are a form of validation we can do here
        type: String,
        required: true
    },
    genre:{
        type: String,
        require: true
    },
    description:{
        type: String
    },
    author:{
        type: String,
        require: true
    },
    publisher:{
        type: String
    },
    pages:{
        type: String
    },
    image_url:{
        type: String,
        required: true
    },
    buy_url:{
        type:String
    },
    create_date:{
        type: Date,
        default: Date.now()
    }
});

// to make this Genre object accessible from outside (anywhere else)
var Book = module.exports = mongoose.model('Book', bookSchema);
// ^ can access Book from outside

// can do database finds etc from the route, but can also encapsulate here
// module.exports allow it to be used from outside
module.exports.getBooks = function(callback, limit){
    Book.find(callback).limit(limit);  // just like in mongo shell (the find)
    // limit is optional
};

// with finding a single book don't need limit as it is only taking 1
module.exports.getBookById = function(id, callback){
    Book.findById(id, callback);    // findById is a mongoose method
};

// Add genre
module.exports.addBook = function(book, callback){ // genre will be data form a form
    Book.create(book, callback);
};

// Update book

module.exports.updateBook = function(id, book, options, callback){
    var query = {_id: id};
    var update = {
        title: book.title,
        genre: book.genre,
        author: book.author,
        description: book.descripion,
        publisher: book.publisher,
        image_url: book.image_url,
        pages: book.pages,
        buy_url: book.buy_url
    };
    Book.findOneAndUpdate(query, update, options, callback);
};

// delete book
// Delete genre
module.exports.deleteBook = function(id, callback){ // genre will be data form a form
    var query = {_id: id};

    Book.remove(query, callback);
};