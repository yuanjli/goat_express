// Require needed modules
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var passport = require('passport');
var session = require('express-session');

// Declare app variable
var app = express();

// Set up use statements
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));


// Include controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));


// Define routes 
app.get('/', function(req, res){
	res.render('home');
	//res.send('hi from home route');
});

// Listen to the port 3000
app.listen(3000);











