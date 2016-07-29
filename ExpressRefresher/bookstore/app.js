/**
 * Created by David on 29/07/2016.
 */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Middleware for bodyParser
app.use(bodyParser.json());

// include files in models
Genre = require('./models/genre');
Book = require('./models/book');
// Connect to Mongoose
var dbUri = 'mongodb://localhost/bookstore';        // can specify without creating first
// note: due to above need to start mongodb service 'sudo ./mongod' first
mongoose.connect(dbUri);
var db = mongoose.connecttion;

// '/' is home page, handles get req to uri '/'
app.get('/', function(req, res){
    res.send("Please use /api/books or /api/genres");  // send to browser
});

/* ------------------------------  GENRES ------------------------------ */

// when a get request is made to /api/genres, run this function
// need modles before this
app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
        if(err){
            throw err
        } else {
            res.json(genres);   // want to send data as json
        }
    });
});
/* from localhost:3000/api/genres
 [{"_id":"579b411cf5c81d954e222c7e","name":"suspense","create_date":"2016-07-29T12:03:54.878Z"},
 {"_id":"579b4128f5c81d954e222c7f","name":"self help","create_date":"2016-07-29T12:03:54.878Z"},
 {"_id":"579b412df5c81d954e222c80","name":"thriller","create_date":"2016-07-29T12:03:54.878Z"}]
 */

// add genre
app.post('/api/genres', function(req, res){ // can be on same url as diff request (get vs post)
    var genre = req.body;
    Genre.addGenre(genre, function(err, genre){
        if(err){
            throw err
        } else {
            res.json(genre);   // want to send data as json
        }
    });
});
// PUT to Update
app.put('/api/genres/:_id', function(req, res){ // can be on same url as diff request (get vs post)
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){  // {} is just blank for options
        if(err){
            throw err
        } else {
            res.json(genre);   // want to send data as json
        }
    });
});
// successfuly updates, sometimes in RESTEasy it sends back old data but checking mongo shows the udpated ver

// delete genre
app.delete('/api/genres/:_id', function(req, res){ // can be on same url as diff request (get vs post)
    var id = req.params._id;
    Genre.deleteGenre(id, function(err, genre){  // {} is just blank for options
        if(err){
            throw err
        }
        res.json(genre);   // want to send data as json

    });
});
/* ------------------------------  BOOKS ------------------------------ */
app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
        if(err){
            throw err
        } else {
            res.json(books)
        }
    });
});

app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, book){
        if(err){
            throw err
        } else {
            res.json(book);
            console.log("Found your book!")
        }
    });
});
// add book
// http://localhost:3000/api/books/579b4369f5c81d954e222c82
// where this bit                  ____________ is the id provided by mongodb

app.post('/api/books', function(req, res){ // can be on same url as diff request (get vs post)
    var book = req.body;
    Book.addBook(book, function(err, book){
        if(err){
            throw err
        } else {
            res.json(book);   // want to send data as json
        }
    });
});

// update book
app.put('/api/books/:_id', function(req, res){ // can be on same url as diff request (get vs post)
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(err, book){  // {} is just blank for options
        if(err){
            throw err
        } else {
            res.json(book);   // want to send data as json
        }
    });
});

// delete book, works :D 
app.delete('/api/books/:_id', function(req, res){ // can be on same url as diff request (get vs post)
    var id = req.params._id;
    Book.deleteBook(id, function(err, book){  // {} is just blank for options
        if(err){
            throw err
        }
        res.json(book);   // want to send data as json

    });
});

app.listen(3000);
console.log("Running");