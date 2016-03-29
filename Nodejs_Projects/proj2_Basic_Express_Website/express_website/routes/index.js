var express = require('express');
var router = express.Router();

/* GET home page, / is the home page*/ 
router.get('/', function(req, res, next) {    // get request to the home page
  res.render('index', { title: 'Home' });  // render displays our jade file
});    //telling it to display index.jade, json object , we have a title set to Express

module.exports = router;

