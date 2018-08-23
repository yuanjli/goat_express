// Require needed modules
var passport = require('passport');
var passportLocalStrategy = require('passport-local').Strategy;


// Declare variables
var db = require('../models');

//Provide serialize/deserialize functions so we can use session 
passport.serializeUser(function(user, callback){      // keep the id for sessions
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	db.user.findById(id).then(function(user){
		callback(null, user);
	}).catch(function(err){
		callback(err, null);
	});
});


// Do the actual logging in part;
passport.use(new passportLocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, callback){   // the callback here can also be named done;
	db.user.findOne({
		where: { email: email }
	}).then(function(foundUser){
		if (!foundUser || !foundUser.isValidPassword(password)) {
			//callback('Invalid User or Password', null);
			callback(null, null);
		} else {
			callback(null, foundUser); 
		}
	}).catch(function(err){
		callback(err, null);
	})
}));


module.exports = passport;    // makes the this file accessible to the rest of the app as passport;







