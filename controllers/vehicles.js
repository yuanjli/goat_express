var express = require('express');
var router = express.Router();
var db = require('../models'); // add it to the database 

// Show all vehicles:
router.get('/', function(req, res){
	db.vehicle.findAll().then(function(allVehicles){
		res.send('====================data=====');
		//res.render('home', {vehicles: allVehicles});
	}).catch(function(err){
		console.log(err);
		res.send('ooooooops');
	});
});


// 



router.get('/new', function(req, res){
	res.render('vehicles/new');
});

router.get('/:id', function(req, res){	// found the author ID
	//res.send('author show page goes here');
	res.send('viehcle');
});



module.exports = router;