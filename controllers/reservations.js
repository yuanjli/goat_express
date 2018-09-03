var express = require('express');

var router = express.Router();

// Get the authorization helper function 
var loggedIn = require('../middleware/loggedin');

var db = require('../models'); // add it to the database 

// Define routes 
router.get('/', loggedIn, function(req, res) { 	  // loggedIn middleware makes sure that somebody is already logged in. 
	res.render('profile/index');
	//res.send('reservation page!!!!!!!! ');
});



router.get('/:id', function(req, res){	// found the author ID
	//res.send('author show page goes here');
	res.send('viehcle');
});

  
// post request for adding a reservation: 
router.post('/addreservation', function(req, res){ 
	res.send("you have reached the post route!!!!!");
})


module.exports = router;