var express = require('express');
var router = express.Router();
var db = require('../models'); // add it to the database 

router.get('/', function(req, res){
	res.send('viehcle');
});

router.get('/', function(req, res){
	res.render('authors/new');
});

router.get('/:id', function(req, res){	// found the author ID
	//res.send('author show page goes here');
	res.send('viehcle');
});



module.exports = router;