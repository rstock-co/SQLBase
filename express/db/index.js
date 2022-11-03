
const pg = require("pg");
require("dotenv").config();

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;

const client = new pg.Client({
  connectionString: connectionString || process.env.DATABASE_URL,
});

console.log(`Connected to ${process.env.DB_NAME} on ${process.env.DB_HOST}`);
client.connect();

module.exports = client;


//user needs createDB permission to create new databases

//each client has db users

// in route create a new client

//let client check if a database has been created or not 

//in order to create a new database a new client needs to be created?
//to interact with new database we need a new client with connection string details (maybe for each user)


//all clients connects on one psql server, with different users having access to mult db
// main client needs createdb permissions
// 1. helper function uses current that creates a new database
//use current client to create new database
// user_id_databaseName as database name column that has original db name to display
// 2. optional function check if that database was created/ exists
// 3. 
// 4. create helper function takes in a database name(which user_id_databaseName), creates a new client to communicate to new database
// create a new route that talks to a specific client /database

//any route that creates a new connection/client, before ending req (before res.send) make sure to end connection

//possibly limit number of active clients