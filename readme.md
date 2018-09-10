# Goat Express : how to Use

Full stack node/express app with basic user authentication. 
This is a prototype of online rental and booking for small business owners. 
To use the app,
	You can Signup or login. 
	You you want to post your vehicle to list for rental, you need to contact me to become a owner.
	Otherwise, you can book reservations after you login. 
	All the reservations will show up on the reservation tab. and you can edit them or delete them. 

	The home page has a service which allows you to enter a name of a place and give a result of related places.



## what it includes 

* sequelize models and migration for user model
* Settings for Postgresql 
* Passport and Passport-Local for authentication 
* Express sessions to keep user logged in from page to page
* Connect-Flash for error/success messages 

* Deployed on Heroku : https://yuanjli-express-car-app.herokuapp.com/	
* A RESTful API call
* Routes for GET, POST, PUT, DELETE.





### User Model 

|Column Name | SQL Type| Notes  |
|------------|---------|----------------------------|
| id | Integer | serial primary key  | 
|createdAt| Date | automatically generated |
| updatedAt| Date | automatically generated |  
| firstname | String | -|
| lastname  | String | -|
| email | String | usernameField for login |
| password | String | hashed with bcrypt |
| dob | Date | - |
| admin | Boolean | Admin or Regular User |  

> NOTE: Change these fields in both the model and migration files BEFORE running sequelize db:migrate


### Default Routes Supplied 
| Method | Path | Location |  Purpose | 
| -------| ---------------| --------------|  ---------------------------------|
|GET | / | index.js | Home page | 
|GET | /profile | controllers/profile.js | Profile page (authorization req)  |
|GET | /auth/login | controllers/auth.js | Login form page  | 
|POST | /auth/login | controllers/auth.js | Login submission + Redirect to Profile| 
|GET | /auth/signup | controllers/auth.js |  Signup form page | 
|POST | /auth/signup | controllers/auth.js | Signup submission + Redirect to Profile |
|GET | /auth/logout | controllers/auth.js |  Logout + Redirect to Home | 





















