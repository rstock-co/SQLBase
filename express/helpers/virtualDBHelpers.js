const pg = require("pg");
require("dotenv").config();
const { Pool, Client } = require('pg')


module.exports = ({ createClientFromState }) => {

  // newClient = null;
  // create table
  const createTable = async (databaseName, userID, schemaString) => {
    console.log('databaseName in create table', databaseName)
    console.log('creating tables with:', schemaString)

    // const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${databaseName}?sslmode=disable`;
    // create new client

    // // const user = userID;
    // const newClient = new Client({
    //   connectionString: connectionString
    // })

    // newClient.connect();
    // console.log(`12Connected to ${databaseName} on ${process.env.DB_HOST}`);



    // await newClient.query(schemaString)
    //   .then(result => console.log('createdTB', result))
    //   .catch(err => err.message)

    // newClient.end();

    // const user = userID;
    const newClient = createClientFromState(databaseName);

    newClient.connect();
    console.log(`12Connected to ${databaseName} on ${process.env.DB_HOST}`);


    await newClient
      .query(schemaString)
      .then(result => console.log('createdTB', result))
      .catch(err => err.message)

    newClient.end();


    // return await newClient.end()
    //   .then(result => console.log(result))
    //   .catch(err => err.message)


  }

  //seed tablea
  const seedTable = async (databaseName, seedString) => {
    console.log('databaseName in insert table', databaseName)
    console.log('inserting tables with:', seedString)
    const newClient = createClientFromState(databaseName);
    newClient.connect();
    console.log(`12Connected to ${databaseName} on ${process.env.DB_HOST}`);



    await newClient.query(seedString)
      .then(result => console.log('insertTB', result))
      .catch(err => err.message)

    newClient.end();
  }

  //query table
  const queryTable = (databaseName, queryString) => {
    console.log('databaseName in query table', databaseName)
    console.log('querying tables with:', queryString)
    const newClient = createClientFromState(databaseName);
    newClient.connect();
    console.log(`12Connected to ${databaseName} on ${process.env.DB_HOST}`);

    await newClient.query(queryString)
      .then(result => console.log('queryTB', result))
      .catch(err => err.message)

    newClient.end();
  }
  return {
    createTable,
    seedTable,
    queryTable
  };
};