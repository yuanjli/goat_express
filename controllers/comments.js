var express = require('express');
var router = express.Router();
var db = require('../models'); // add it to the database 



router.post('/', function(req, res){
	//res.send('comments post route works !'); //checks if the functions is working;
	db.comment.create(req.body).then(function(createdComment){
		res.redirect('/vehicles/' + req.body.vehicleId);
	}).catch(function(err){
		res.render('error');
	});
});



module.exports = router; 







