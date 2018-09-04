// Require .env file's variables
require('dotenv').config();   //access the .env file

// Require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var session = require('express-session');

// Declare app variable
var app = express();

// Set up use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false })); // Tell the express to use the bodyParser. 
													 // extended: false ==> means value can be string or array. 
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));     
app.use(flash());
app.use(passport.initialize());     // make sure that session is above the passport
app.use(passport.session());


// Custom middleware --- fun! 
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();      // I have user on every single page. 
});


// Include controllers (requring routes)
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));
app.use('/reservations', require('./controllers/reservations'));
app.use('/vehicles', require('./controllers/vehicles'));

// Define routes 
app.get('/', function(req, res){
	res.render('home');
	//res.send('hi from home route');
});

app.get('*', function(req, res){
	console.log('THIS went to the wildcard route');
	res.render('error');
	//res.send('hi from home route');
});

// Listen to the port 3000
app.listen(process.env.PORT || 3000);











