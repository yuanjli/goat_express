// Require .env file's variables
require('dotenv').config();   //access the .env file

// Require db models
var db = require('./models');

// Require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var flash = require('connect-flash');
var passport = require('./config/passportConfig');
var session = require('express-session');
var request = require('request');   // request for APi calls.

// These lines makes the session use sequelize to write session data to a db table
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 30 * 60 * 1000 // expire in 30 minutes
});

// Declare app variable
var app = express();

// API call: moved down to app.get


// Set up use statements
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/')); 
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false })); // Tell the express to use the bodyParser. 
													 // extended: false ==> means value can be string or array. 
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	store: sessionStore,
  	cookie: { maxAge: 30 * 60 * 1000 },
  	store: sessionStore
})); 

sessionStore.sync(); // creates the sessions table    
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

// The API call to http://www.geonames.org/ 
app.get('/search-results', function(req, res){
	// res.send('the search results has started')
	var query = req.query.searched;
	console.log(query);
	//process.env.UN_A_KEY
	var url = 'http://api.geonames.org/searchJSON?q=' + query + '&country=US&maxRows=15&username=myusername';
	request(url, function (error, response, body) {
	if(!error && response.statusCode ==200){
		console.log
		var parsedData = JSON.parse(body);  // Change the Json data from string to object.
		console.log('=============>API-body:', parsedData);// parsedData["Search"][0]["Title"] // Print the HTML for the Google homepage.
		//res.send(parsedData["Search"][0]["Title"]);
		res.render('results', { data: parsedData });
	}else {
		Console.log('Something went wrong');
		res.send("Your search results is not found"); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		}
	});
});



app.get('*', function(req, res){
	//console.log('THIS went to the wildcard route');
	res.render('error');
	//res.send('hi from home route');
});

// Listen to the port 3000
app.listen(process.env.PORT || 3000);












