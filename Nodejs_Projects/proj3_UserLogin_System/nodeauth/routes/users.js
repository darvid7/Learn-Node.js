var express = require('express');
var router = express.Router();

/* GET users listing. */
// use this to grab a page or send msg
router.get('/', function(req, res, next) {
  res.send('respond with a resource [placeholder text here]');
});

// goes to users/register, get req --> what happens when go to pg
router.get('/register', function(req, res, next){
  // render register page
  res.render('register', {
    'title' : 'Register'
  })
});


router.get('/login', function(req, res, next){
  res.render('login', {
    // defines the title
    'title' : 'Login'
  })
});

// post reqests for submitting data
// function takes a request, response and next
// already in users route file so use /rgister instead of /users/register
router.post('/register',function(req, res, next){
  // get form values via req.body.name_of_input
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  console.log('got here');
  // check for profileimage field
  console.log(req.files);
  console.log(req.files.profileimage.name);
  if (req.files.profileimage) {
    console.log('Uploading File..');
    // get all diff properties of file object
    var profileimageOrgName = req.files.profileimage.originalname;
    var profileimageName = req.files.profileimage.name;
    var profileimageMime = req.files.profileimage.mimeType;
    var profileimagePath = req.files.profileimage.path;
    var profileimageExt = req.files.profileimage.extension;
    var profileimageSize = req.files.size;

  } else {
    console.log('else');
    // set a default profileimage
    var profileimageName = 'noprofileimage.png';
  }

  // Form validation - via express validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Invalid email').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);
  // req.checkBpdu('fieldname'. 'er msg', notempty/check condition;

  // Check for errors
  var errors = req.validtionErrors();
  if(errors){
    res.render('register', {
      errors : errors,    // errors array
      // don't clear form is error
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else{
    // new user object
    // points to user model, not created yet
      var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimageName
      // pass all the information to our new user object
    });

    // Create User
    User.createUser(newUser, function(err, user){
      if (err) throw err;
      console.log(user);
    });
    // Success message
    req.flash('success', 'You are now registered and may log in');
    // redirect to home page
    res.location('/'); // to home page
    res.redirect();
  }

});

module.exports = router;
