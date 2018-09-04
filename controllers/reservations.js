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
		console.log('something=======================')
		res.render('reservations/index', { reservations: reservations });
	}).catch(function(err){
		console.log(err);
		res.render('reservations/index', { reservations: reservations });
		//res.render('error');
	})	
});

// New: show Reservations New form
router.get('/new', function(req, res){
	//res.send('viehcle new reservations page goes here');
	res.render('reservations/new');
});

// CREATE - add new vehicle to DB; post request for adding a reservation
router.post('/', function(req, res){ 
	console.log(req.body);
	//res.send("you have reached the post route!!!!!");			// for testing purpose
	//res.send(req.body);										// for testing purpose
	db.reservation.create(req.body).then(function(createdReservation){
		res.redirect('/reservations/' + createdReservation.id)
	}).catch(function(err){
		console.log(err);
		res.send(typeof(req.body));	
		//res.send('Nooooooooo!');
	});
});

// Show the reservation page
router.get('/:id', function(req, res){	// found the author ID
	//res.send('author show page goes here');
	//res.send('viehcle');
		db.vehicle.findOne({
		where: {id: req.params.id},
		include: [db.user, db.comment, db.reservation]
	}).then(function(foundVehicle){
		db.user.findAll().then(function(allUsers){
			res.render('vehicles/show', {vehicle: foundVehicle, users: allUsers});
										// this sends the vehicle and users to the ejs file.
		}).catch(function(err){
			console.log(err);
			res.render('error');
		});
	}).catch(function(err){
		console.log(err);
		res.render('error');
	});
});



module.exports = router;






