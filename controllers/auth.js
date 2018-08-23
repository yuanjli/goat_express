// Require express because express is not globaly 
var express = require('express');

// Declare a new router 
var router = express.Router();

// Define routes 
router.get('/login', function(req, res) {
	res.send('auth login form  page!!!!!!!! ');
});

router.post('/login', function(req, res){
	res.send('login post route ');
});


router.get('/signup', function(req, res) {
	res.send('auth signup form  page!!!!!!!! ');
});

router.post('/signup', function(req, res){
	res.send('signup post route ');
});

router.get('/logout', function(req, res) {
	res.send('auth logout form  page!!!!!!!! ');
});

router.post('/logout', function(req, res){
	res.send('logout post route ');
});



module.exports = router;