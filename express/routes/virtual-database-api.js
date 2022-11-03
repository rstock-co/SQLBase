const express = require("express");
const router = express.Router();

module.exports = ({ createTable, seedTable, queryTable }) => {

  router.put("/", (req, res) => {
    const userID = req.body.userID;
    const globalStateString = req.body.globalStateString;
    const originalDBName = globalStateString.databaseName
    createTable(originalDBName, userID)
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