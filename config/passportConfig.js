// Use env variables
require('dotenv').config();

// Require needed modules
var passport = require('passport');
var passportFacebookStrategy = require('passport-facebook').Strategy;
var passportLocalStrategy = require('passport-local').Strategy;


// Declare variables
var db = require('../models');


// Provide serialize/deserialize functions so we can use session 
passport.serializeUser(function(user, callback){      // keep the id for sessions
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
	db.user.findById(id).then(function(user){     // get the rest of the user from the id
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
	db.user.findOne({   // the is the database call; 
		where: { email: email }
	}).then(function(foundUser){
		if (!foundUser || !foundUser.isValidPassword(password)) {
			//callback('Invalid User or Password', null);
			callback(null, null);
		} else {
			callback(null, foundUser);  // pass the user information back on successful login 
		}
	}).catch(function(err){
		callback(err, null);
	});
}));

passport.use(new passportFacebookStrategy({
	clientID: process.env.FB_APP_ID,
	clientSecret: process.env.FB_APP_SECRET,
	callbackURL: process.env.BASE_URL + '/auth/callback/facebook', 
	profileFields: ['id', 'email', 'displayName'],
	enableProof: true
}, function(accessToken, refreshToken, profile, done){
	// see if we have an email address we can use for identifying the user
	var facebookEmail = profile.emails ? profile.emails[0].value: null;

	// see if the email exists in the users table
	db.user.findOne({
		where: { email: facebookEmail }

	}).then(function(existingUser){
		if(existingUser & facebookEmail){
			// This user is a returning user - update facebookId and Token
			existingUser.updateAttributes({
				facebookId: profile.id,
				facebookToken: accessToken,
			}).then(function(updatedUser){
				done(null, updatedUser);
			}).catch(done);
		}
		else {
			// The person is a new user, so create an entry for them 
			// Parse the user's name 
			var usernameArr = profile.displayName.split('');

			db.user.findOrCreate({
				where: { facebookId: profile.id },
				defaults: {
					facebookToken: accessToken,
					email: facebookEmail,
					firstname: usernameArr[0],
					lastname: usernameArr[usernameArr.length-1],
					admin: false,
					image: 'http://animals.sandiegozoo.org/sites/default/files/2016-08/category-thumbnail-mammals_0.jpg',
					dob: profile.birthday
				}
			}).spread(function(user, wasCreated){
				if(wasCreated){
					// This is expected, yay
					done(null, user);

				}
				else {
					// This user was not new after all, this could happen if the user changed their 
					// email on Facebook since they last logged in with you
					user.facebookToken = accessToken;
					user.email = facebookEmail;
					user.save().then(function(updatedUser){
						done(null, updatedUser)
					}).catch(done);
				}
			});
		}
	})
}));


module.exports = passport;    // makes the this file accessible to the rest of the app as passport;





























