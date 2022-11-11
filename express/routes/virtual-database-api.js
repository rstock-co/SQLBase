const express = require("express");
const router = express.Router();

module.exports = ({ createTable, dropDB, seedTable, queryTable }) => {

  router.put("/", (req, res) => {
    const userID = req.body.userID;
    const schemaString = req.body.schemaString;
    const globalStateString = req.body.globalStateString;
    const originalDBName = globalStateString.databaseName;
    // const schemaString = globalStateString.schemaString
    // console.log('rsschemaString', schemaString)
    createTable(originalDBName, userID, schemaString)
      .then(data => {
        // console.log(data)
        res.json(data);
      })
      .catch(err => {
        console.log('vda', err.message)
        res.status(500).json({ error: err.message });
      });
  })


  router.post("/", (req, res) => {
    const globalStateString = req.body.globalStateString;
    const originalDBName = globalStateString.databaseName;

    dropDB(originalDBName)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log('vda', err.message)
        res.status(500).json({ error: err.message });
      });
  })



  return router;
}