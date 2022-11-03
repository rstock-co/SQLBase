const express = require("express");
const router = express.Router();

module.exports = ({ createTable, seedTable, queryTable }) => {

  router.put("/", (req, res) => {
    const userID = req.body.userID;
    const globalStateString = req.body.globalStateString;
    const schemaString = req.body.schemaString;
    const originalDBName = globalStateString.databaseName;
    // const schemaString = globalStateString.schemaString
    console.log('rsschemaString', schemaString)
    createTable(originalDBName, userID, schemaString)
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