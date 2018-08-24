// Require express because express is not globaly 
var express = require('express');

// Include the models 
var db = require('../models');
var passport = require('../config/passportConfig');

// Declare a new router 
var router = express.Router();

// Define routes 
router.get('/login', function(req, res) {
	res.render('auth/login');
	//res.send('auth login form  page!!!!!!!! ');
});



router.post('/login', passport.authenticate('local', {  // local goes straight to the passportconfig the use function. 
	successRedirect: '/profile',
	successFlash: 'Yay, login successful! :D',  //success message 
	failureRedirect: '/auth/login',
	failureFlash: 'Invalid Credentials'    //error message 
})
	//console.log(req.body);
	//res.send('login post route ');
);








router.get('/signup', function(req, res) {
	res.render('auth/signup');
	//res.send('auth signup form  page!!!!!!!! ');
});

router.post('/signup', function(req, res){
	console.log(req.body);
	req.body.admin = false;
	db.user.findOrCreate({
		where: { email: req.body.email },
		defaults: req.body
	}).spread(function(user, wasCreated){
		if(wasCreated){   // This is expected behavious: 
			// to do:  
			passport.authenticate('local', {
				successRedirect: '/profile',
				successFlash: 'Successfully logged in!',
				failureRedirect: '/',
				failureFlash: 'Oh , Noses?'
			}) (req, res);
			// Automatically log the user in! 
			//res.redirect('/profile');
		} else 	{    // if the user messed up, they already have a login: 
			// send user some sort of error message! 
			res.redirect('/auth/login');
		}
	}).catch(function(err){
		console.log(err);
		req.flash('error', err.message);
		res.redirect('/auth/signup');
		//res.send(err);
	});

});

router.get('/logout', function(req, res) {
	req.logout();    // logs out of session
	req.flash('success', 'Successfully logged out!'); 
	res.redirect('/');
	//res.render('auth/logout');
	//res.send('auth logout form  page!!!!!!!! ');
});



module.exports = router;









