const pg = require("pg");
require("dotenv").config();
const { Pool, Client } = require('pg')


module.exports = client => {


  // create table
  const createTable = async (databaseName, userID) => {
    console.log('databaseName in create table', databaseName)

    const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${databaseName}?sslmode=disable`;
    // create new client

    // const user = userID;
    const newClient = new Client({
      connectionString: connectionString
    })

    newClient.connect();
    console.log(`12Connected to ${databaseName} on ${process.env.DB_HOST}`);

    await newClient.query("CREATE TABLE test_table (id serial PRIMARY KEY NOT NULL, name VARCHAR(50) NOT NULL);")
      .then(result => console.log('createdTB', result))
      .catch(err => err.message)

    // return await newClient.end()
    //   .then(result => console.log(result))
    //   .catch(err => err.message)


  }

  //seed tablea
  const seedTable = (seedString) => {

  }

  //query table
  const queryTable = (queryTable) => {

  }
  return {
    createTable,
    seedTable,
    queryTable
  };
};