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


## Steps to Use 

#### 1. Clone repo, but with a different name! 

```
git clone <repo_link> <new_name>
```

#### 2. Install node modules from 'package.json'

``` 
npm install 
```

#### 3. Customize with project name

* Title in the layout.ejs
* Logo in the navbar
* Description/Repo link in package.json
* Remove the auth boilerplate's readme content


#### 4. Create a new database for your new project

```
createdb <new_db_name>

```

#### 5. Open `config.json`  and change the following

* Change database name to what you created in step 2
* Set username/password for your local environment 
* Make sure the flavor of SQL matches what you're using

> NOTE: If changing from Postgres, you will need different node_modules 

#### 6. Check  models and migrations for your needs 

For example, if you don't need the `amdin` column, you will want to delete it from both the migration and model for the user. Likewise, if you need to add something, add in both files. 

#### 7. Run the migrations

```
sequelize db:migrate
```

#### 8. Add a `.env` file with a SESSION_SECRET key 

This can be set to anything. 


#### 9. Run your server and make sure everything works

If you have nodemon installed globally: 

```
nodemon 
```

Otherwise: 
``` 
node index.js 
```
#### 10. Create a new repository for the new project to live in!

* Create a new repostitory on your personal Github account. 
* Delete the old remote to origin
* Add new repo as a new remote location (can also be called origin since we deleted the original origin)
* PUSH !

``` 
git remote remove origin 
git remote add origin <new_repo_link>
git add .
git commit -m "Beginning of new project"
git push origin master
```

> NOTE: Do NOT make commits from the new project to your auth boilerplate! Keep it pristine!!!

## Next steps 

Assuming that the set up steps went smoothly, now you can add new models/migrations for your new app, and generally just start developing it as if you had started from scratch!  






















