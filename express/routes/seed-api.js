const express = require("express");
const router = express.Router();

module.exports = ({ seedTable }) => {
  router.put('/', (req, res) => {
    let databaseName = req.body.databaseName;
    let seedString = req.body.seedString
    seedTable(databaseName, seedString)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log('seedTable', err.message)
        res.status(500).json({ error: err.message });
      });
  })

  return router;
};
