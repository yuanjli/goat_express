// Require express because express is not globaly 
var express = require('express');

// Declare a new router 
var router = express.Router();

// Define routes 
router.get('/', function(req, res) {
	res.send('profile page!!!!!!!! ');
});


module.exports = router;