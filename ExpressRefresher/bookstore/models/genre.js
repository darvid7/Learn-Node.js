/**
 * Created by David on 29/07/2016.
 */
var mongoose = require("mongoose");

// Genre Schema
var genreSchema = mongoose.Schema({
    // pass in fields here
    // so genre will have a name
    name:{
        // type and required are a form of validation we can do here
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now()
    }
});

// to make this Genre object accessible from outside (anywhere else)
var Genre = module.exports = mongoose.model('Genre', genreSchema);
// ^ can access Genre from outside

// can do database finds etc from the route, but can also encapsulate here
// module.exports allow it to be used from outside
module.exports.getGenres = function(callback, limit){
    Genre.find(callback).limit(limit);  // just like in mongo shell (the find)
    // limit is optional
};

// Add genre
module.exports.addGenre = function(genre, callback){ // genre will be data form a form
    Genre.create(genre, callback);
};

// Update genre
module.exports.updateGenre = function(id, genre, options, callback){
    var query = {_id: id};
    var update = {
        name: genre.name
    };
    Genre.findOneAndUpdate(query, update, options, callback);
};

// Delete genre
module.exports.deleteGenre = function(id, callback){ // genre will be data form a form
    var query = {_id: id};
    
    Genre.remove(query, callback);
};