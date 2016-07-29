/**
 * Created by David on 29/07/2016.
 */

// import modules
var express = require('express');
var bodyParser = require('body-parser');    // allows use to grab form data
var path = require('path');                 // core module, don't need to install it manually
var expressValidator = require('express-validator');
// bring in mongojs
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);   // into customerapp bring in collection users

// set objectID
var ObjectId = mongojs.ObjectId;
//var ejs = require('ejs');
// to use express go app.xxx();
var app = express();

// set port to listen to, any port above 80 (I think)
var port = 3000;

/***********  MIDDLEWARE ****************************/
// app.use() to set up what middleware we need
// ---------  CUSTOM MIDDLEWARE -------------------
// has full access to req, res, next.
// run every time application loaded
var logger = function (req, res, next) {
    console.log('Logging...testing custom middleware');
    next();                             // end this piece of middleware and fire the next via next()
};
// to make use of the custom middleware need to
app.use(logger); // order is important, if put after route handler (app.get('/')) then will not work
// ---------  CUSTOM MIDDLEWARE -------------------
// ---------  MODULE MIDDLEWARE -------------------
// Body-parser middleware
app.use(bodyParser.json());                           // handle passing json content
app.use(bodyParser.urlencoded({extended:false}));
// set Static (public folder) middleware path
app.use(express.static(path.join(__dirname, 'public')));    // we will put css, html in this public (client) folder
// index.HTML overwrites what is in app.js

// view engine, EJS middleware
app.set('view engine', 'ejs');                    // specifiy view engine
// to use jade --> app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views')); // specify view folder

// GLOBAL VARS - has to be set up in middle ware [use app.use()]
app.use(function(req, res, next){
    res.locals.errors = null;            // set a global to null
    next();                              // seems to work without this bit for me
});

// Express validator middleware set up
// sets up error formatter
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
/***********  MIDDLEWARE End ****************************/

// example of passing json, passing an array
var people = [
    {
        name: 'Jeff',
        age: 30
    },
    {
        name:'Chuck',
        age: 24
    },
    {
        name:'Bill',
        age: 40
    }
];

var users = [
    {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "jd@gmail.com"
    },
    {
        id: "2",
        first_name:"Jill",
        last_name:"Jackson",
        email:"jill@gmail.com"
    }
];

// handle a get request to the homepage '/'
// this is called when you go to the homepage of the site, idealy want to render a view
// note {} is an object
app.get('/', function(req, res){
    // get db contents
    db.users.find(function(err, docs){
        console.log(docs);

        res.render('index', {
            title:'Customers',
            users: docs                    // turns out like [object Object],[object Object] as it's an object and can't just print objects, need to iterate through

        });
        //res.send('Hello World');         // prints text to the screen
        //res.json(people);                  // how APIs are written
    });

});

/* FROM ABOVE GET
Users are now fetched from the db after db.users.find then getting the docs and passing them on as users in the json
now talking to mongodb, can add more users from shell and it will show
 User: = John Doe
 User: = Jane Doe
 User: = Kevin Ham

 */

// catch our post for new users
// instead of just creating a new user, we can add them to the database now
// get form data via post
app.post('/users/add', function(req, res){
    console.log("Validating form inputs");
    // req.checkBody('attribute_name', 'err_msg').rule();
    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'Email is Required').isEmail();

    var errors = req.validationErrors();
    if(errors){
        // title and users to re render the form (without the inputs)
        // also pass in errors
        res.render('index', {
            title: 'Customers',
            users: users,
            errors: errors
        });
    } else {
        // grab values using req.body.name_attribute
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        };
        // form submission creates new user
        console.log(newUser);
        console.log('Success');

        // add to db
        // try insert, if err log it, else redirect back to home
        db.users.insert(newUser, function(err, result) {
            if (err){
                console.log(err);
            } else {
                res.redirect('/');
                console.log("Inserted into db")
            }

        });

        // note here result and res are different


    }
});

app.delete('/users/delete/:id', function(req, res){
    db.users.remove({_id: ObjectId(req.params.id)}, function(err){
        if(err){
            consoles.log(err);
        } else {
            res.redirect('/');
        }
    })
});


// app.listen(port_no, call_back_function(){};
app.listen(port, function () {
    console.log('Server started on port ' + port);
});