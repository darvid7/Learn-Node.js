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
            user: 'clientLogIn@gmail.com',   // logged in email (client)
            pass: 'clientPass@gmail.com'                // logged in email pw (client)
        }
    });

    var mailOptions = {
        from: 'From name John Doe <johndoe@outlook.com>',     // sent from, note: the sent from email is the client's when you view the msg
        to: 'serverEmail@gmail.com',                   // send to option (server/where everything goes)
        subject: 'Website Submission',
        text: 'You have a new submission with the following details...Name: '+ req.body.name+' Email: '+req.body.email+' MessageA: '+req.body.message,
        html: '<p>You have a new submission with the following details</p> <ul><li>Name: '+req.body.name+'</li><li>EmailA: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
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


