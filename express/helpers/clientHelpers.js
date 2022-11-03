const pg = require("pg");
require("dotenv").config();
const { Pool, Client } = require('pg')

const createClientFromState = (databaseName) => {
  const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${databaseName}?sslmode=disable`;

  const newClient = new Client({
    connectionString: connectionString
  })
  console.log('newclient created', newClient)

  return newClient
}

module.exports = {
  createClientFromState
}