const pg = require("pg");
require("dotenv").config();
const { Pool, Client } = require('pg')


module.exports = ({ createClientFromState }) => {


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



    await newClient.query(schemaString)
      .then(result => console.log('createdTB', result))
      .catch(err => err.message)

    newClient.end();


    // return await newClient.end()
    //   .then(result => console.log(result))
    //   .catch(err => err.message)


  }

  //seed tablea
  const seedTable = async (databaseName, seedString) => {
    // console.log('databaseName in create table', databaseName)
    // console.log('creating tables with:', schemaString)

    const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${databaseName}?sslmode=disable`;
    // create new client

    // const user = userID;
    const newClient = new Client({
      connectionString: connectionString
    })

    newClient.connect();
    console.log(`12Connected to ${databaseName} on ${process.env.DB_HOST}`);



    await newClient.query("insert into users")
      .then(result => console.log('insertTB', result))
      .catch(err => err.message)

    newClient.end();
  }

  //query table
  const queryTable = (databaseName, queryString) => {
    // // console.log('databaseName in create table', databaseName)
    // // console.log('creating tables with:', schemaString)

    // const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${databaseName}?sslmode=disable`;
    // // create new client

    // // const user = userID;
    // const newClient = new Client({
    //   connectionString: connectionString
    // })

    // newClient.connect();
    // console.log(`12Connected to ${databaseName} on ${process.env.DB_HOST}`);

    // await newClient.query("SELECT * FROM")
    //   .then(result => console.log('insertTB', result))
    //   .catch(err => err.message)

    // newClient.end();
  }
  return {
    createTable,
    seedTable,
    queryTable
  };
};