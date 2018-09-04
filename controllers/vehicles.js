var express = require('express');
var router = express.Router();
var db = require('../models'); // add it to the database 

// INDEX page route. Show all vehicles: 
router.get('/', function(req, res){
	db.vehicle.findAll().then(function(allVehicles){
		//res.send('======Here should be the vehicle data======');
		res.render('home', {vehicles: allVehicles});
	}).catch(function(err){
		console.log(err);
		res.send('ooooooops');
	});
});

// NEW - show form to create new vehicles
router.get('/new', function(req, res){
	res.render('vehicles/new');
});


// CREATE - add new vehicle to DB
router.post('/', function(req, res){
	console.log(req.body);
	db.vehicle.create(req.body).then(function(createdVehicle){
		res.redirect('/vehicles/' + createdVehicle.id)
	}).catch(function(err){
		console.log(err);
		res.send('Nooooooooo!');
	});
});

// SHOW the vehicle page 
router.get('/:id', function(req, res){	// found the vehicle ID
	//res.send('vehicle show page goes here');
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




