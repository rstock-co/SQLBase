const express = require("express");
const router = express.Router();

module.exports = ({ createDB, queryDBParams, queryDB }) => {

  //creates db
  router.put("/", (req, res) => {
    console.log(req.body)
    const globalStateString = req.body.globalStateString;
    const originalDBName = globalStateString.databaseName
    console.log(originalDBName)


    // // const { Pool, Client } = require('pg')
    // //globalSateString to create db
    // const globalStateString = req.body.globalStateString;
    // console.log(globalStateString)
    // const user = req.body.userID;
    // // const client = new Client({
    // //   user: `${user}`,
    // //   host: 'localhost',
    // //   password: 'postgres',
    // //   port: 5432
    // // })

    const dbName = `_DBNAME`

    createDB(dbName)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
    //gets state from all databases that belong to user

  })
  router.get("/", (req, res) => {
    queryDB(
      `SELECT global_state FROM databases WHERE user_id = 1 ORDER BY created_at DESC;`
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
}