/**
 * Created by David on 29/03/2016.
 */

var express = require('express');
var router = express.Router();

/* GET home page, / is the home page*/
router.get('/', function(req, res, next) {    // get request to the home page
    res.render('about', { title: 'About' });  // render displays our jade file
});    //telling it to display about.jade, json object , we have a title set to About

module.exports = router;

