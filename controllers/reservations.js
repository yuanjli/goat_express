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
		console.log('=========================Should show all reservations=======================')
		res.render('reservations/index', { reservations: reservations });
	}).catch(function(err){
		//console.log('something=======================');
		console.log(err);
		//res.render('reservations/index', { reservations: reservations });
		res.send('WHAT is going on here?');
	})	
});

// Get the edit form:
router.get('/edit/:id', function(req, res) {
	console.log('=========================Should show edit form page=======================')
	db.reservation.findById(req.params.id).then(function(foundReservation){
		res.render('reservations/edit', { reservation: foundReservation });
	}).catch(function(err){
		//console.log('error', err);
		res.render('error');
	});
	//res.send('edit tag form goes here later');
});



// New: show Reservations New form
router.get('/new', function(req, res){
	//res.send('viehcle new reservations page goes here');
	console.log('=========================Should show booking new reservation page =======================')
	db.vehicle.findAll(
	//	where: {} put a condition that matches the call.  
	).then(function(allVehicle){
		//console.log('=============++> ', allVehicle);
		res.render('reservations/new', { vehicle: allVehicle });
	});
});

// CREATE - add new reservation to DB; post request for adding a reservation
router.post('/', function(req, res){ 
	// console.log(req.body);   		// for testing purpose
	//res.send(req.body);										// for testing purpose
	console.log('=========================Should show NEWLY ADDED reservation=======================')
	db.reservation.create(req.body).then(function(createdReservation){
		res.redirect('/reservations/' + createdReservation.id)
	}).catch(function(err){
		console.log(err);
		res.send(req.body);	
		//res.send('Nooooooooo!');
	});
});

// Show the reservation page
router.get('/:id', function(req, res){	// found the author ID
	//res.send('author show page goes here');
	//res.send('viehcle');
	console.log('=============>The route shows the individual reservation details <==========');
	db.reservation.findOne({
		where: {id: req.params.id},
			include: [db.user, db.vehicle]  // find all the data in those table associated with the id in the vehicle table.
		}).then(function(foundReservation){
			//console.log(foundReservation);
			res.render('reservations/show', {reservation: foundReservation })
									// this sends the vehicle and users to the ejs file.

								}).catch(function(err){
									console.log(err);
									res.render('error');
								});
							});



// Change the reservation dates;
router.put('/:id', function(req, res){   // had to be called from ajax 
	//console.log("YAY WE HIT THE RIGHT PUT ROUTE");
	//console.log(req.body);
	//res.send(req.body);
	console.log('=========================Should Change the reservation start date and end date=======================')
	db.reservation.findOne({
		where: {id: req.params.id }
	}).then(function(foundReservation){
		foundReservation.startDate = req.body.startDate; // Update something in the database;
		foundReservation.endDate = req.body.endDate;
		foundReservation.save();    		   // It always need to save or it won't commit to the database;
	}).then(function(updated){	//updated here is not really needed!	   // We always need to send something back to the ajax to tell it's done!
		res.send('tag was updated!');  // anything sended back to the ajax for finishing update.
	});
});


// Ths DELETE route.
router.delete('/:id', function(req, res){        // had to be called from ajax 
	// This :id is the req.params.id	 // req exist everytime the frond end sends a request to the back end. 
	console.log('=========================Should delete the particular reservation =======================')
	db.reservation.findOne({
		where: { id: req.params.id },
		include: [db.user, db.vehicle]	// associations what give you the article

	}).then(function(){
			// How that the references in the join table are gone, I can freely delete the tag
			db.reservation.destroy({  					// delete the tag entry in the table!
				where: { id: req.params.id }	// where the id matches the req.params.id
			}).then(function(){
				res.send('SUCCESSFULLY DELETED!');
			}).catch(function(err){
				res.status(500).send('OH NOOOOOOOOO!');
			});
		});
});
	//res.send('DELETE!');









	module.exports = router;








