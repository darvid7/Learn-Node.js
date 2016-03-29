/**
 * Created by David on 29/03/2016.
 */


var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
/* GET home page, / is the home page*/
router.get('/', function(req, res, next) {    // get request to the home page
    res.render('contact', { title: 'Contact' });  // render displays our jade file
});    //telling it to display about.jade, json object , we have a title set to About

router.post('/send', function(req, res, next){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {     // authenticate with gmail
            user: 'authenticateME@gmail.com',
            pass: 'mypass'
        }
    });

    var mailOptions = {
        from: 'John Doe <johndoe@outlook.com>',
        to: 'authenticateME@gmail.com',
        subject: 'Website Submission',
        text: 'You have a new submission with the following details...Name: ' + req.body.name+ ' Email: ' + req.body.email + ' Message: ' + req.body.message,
        html: '<p>You have a new submission with the following details<p/><ul><li>Name: ' + req.body.name + '<li/> <li>Email: ' + req.body.email + '<li/><li></li>Message: ' + req.body.message+'<li/><ul/>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if(error){
            console.log(error);
            res.redirect('/'); // redirect to home page
        } else {
            console.log('Message Sent: ' + info.response);
            res.redirect('/')
        }
    });
});
module.exports = router;


