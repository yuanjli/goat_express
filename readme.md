# Auth Boilerplate : how to Use


is a bare bones node/express app with basic user authentication. It exists so that I don't need to do this bit from scratch everytime I start a new project that needs to include auth. Instead, I can take this fairly generic boilerplate code and customize it on a new project. 


## what it includes 

* sequelize models and migration for user model
* Settings for Postgresql 
* Passport and Passport-Local for authentication 
* Express sessions to keep user logged in from page to page
* Connect-Flash for error/success messages 


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