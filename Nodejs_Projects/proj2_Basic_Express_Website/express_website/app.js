// require all modules needed
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var routes = require('./routes/index');  // routes set to index, so that is directing the home page
var about = require('./routes/about')
var contact = require('./routes/contact')

var app = express();

// view engine setup (specif our HTML engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// small programs that need to run to do things i.e Parse HTML/json
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));    // want the public folder to be where we put static pages (css, js etc)

app.use('/', routes);       // if in home (rep by /) going to call routes variable (defined before as index)
app.use('/about', about);
app.use('/contact', contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.listen(8080);
module.exports = app;
