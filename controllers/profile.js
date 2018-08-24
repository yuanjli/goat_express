// Require express because express is not globaly 
var express = require('express');

// Declare a new router 
var router = express.Router();

// Get the authorization helper function 
var loggedIn = require('../middleware/loggedin');

// Define routes 
router.get('/', loggedIn, function(req, res) { 	  // loggedIn middleware makes sure that somebody is already logged in. 
	res.render('profile/index')
	//res.send('profile page!!!!!!!! ');
});


module.exports = router;