# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend. 

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 

## Installation Instructions
This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`npm install`

### Packages

Here are some of the few packages that were installed.

#### express
`npm i express`
`npm i --save-dev @types/express`

#### typescript
`npm i --save-dev typescript`

#### db-migrate
`npm install db-migrate`

#### cors
`npm i cors`
`npm i --save-dev @types/cors`

#### bcrypt
`npm i bcrypt`
`npm i --save-dev @types/bcrypt`

#### jsonwebtoken
`npm i jsonwebtoken`
`npm i --save-dev @types/jsonwebtoken`

#### dotenv
`npm i dotenv`

#### jasmine
`npm i --save-dev jasmine`
`npm i --save-dev @types/jasmine`
#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`

## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER postgres WITH PASSWORD '########';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE store_dev;`
    - `CREATE DATABASE store_test;`
    

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`npx db-migrate create name`

!['migrate up database'](./docs/migrate_up.png)


!['migrate reset database'](./docs/migrate_reset.png)

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in developement and testing but not in production. 
```
PORT = 3000

ENV = dev

# database connection info.
PG_HOST = localhost
PG_PORT = 5432
PG_DB = store_dev
PG_DB_TEST = store_test
PG_USER = ##########
PG_PASSWORD = ############

BCRYPT = ###########
SALT_ROUNDS = 10

TOKEN_SECRET = ################
```

## Start App
`yarn watch` or `npm run watch`

!['start server'](./docs/start.png)

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`yarn test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 

!['test 1'](docs/test1.png)
!['test 2'](docs/test2.png)


## Important Notes 

### Environment Variables
Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I had provided the names of the variables that need to be set above. I also provided some values that were used in development and testing. 


### Changing Enviroment to testing 
I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database. 

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command `npm run test` will set this variable to `test` in the package.json. Here is the complete command.
`set ENV=test && tsc && db-migrate --env test  up && tsc && jasmine || db-migrate --env test reset`
and I also made another script for linux system as "set" command there is called "export" 

The first command migrates all tables then the second command changes the enviroment variable `ENV` to testing, then the jasmine is run and then after testing, the database is reset. 

### There are scripts in the pakage.json file that will help to run the project

!['Scripts'](docs/scripts.png)