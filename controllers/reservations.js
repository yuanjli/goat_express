// Requires;
var express = require('express');
var router = express.Router();
// Get the authorization helper function 
var loggedIn = require('../middleware/loggedin');
var db = require('../models'); // add it to the database 


// Define routes 
// Index pages show all reservations:
router.get('/', function(req, res) { 	  // loggedIn middleware makes sure that somebody is already logged in. 
	//res.send('reservation page!!!!!!!! ');  // for page route testing.
	db.reservation.findAll().then(function(reservations){
		res.render('reservations/index', { reservations: reservations });
	}).catch(function(err){
		console.log(err);
		res.render('error');
	})	
});

// New: show Reservations New form
router.get('/new', function(req, res){
	//res.send('viehcle new reservations page goes here');
	res.render('reservations/new');
});


// Show the reservation page
router.get('/:id', function(req, res){	// found the author ID
	//res.send('author show page goes here');
	res.send('viehcle');
});

  
// CREATE - add new vehicle to DB; post request for adding a reservation
router.post('/', function(req, res){ 
	console.log(req.body);
	//res.send("you have reached the post route!!!!!");
	res.send(req.body);
});


module.exports = router;






