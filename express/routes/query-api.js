const express = require("express");
const router = express.Router();

module.exports = ({ queryTable }) => {
  router.get('/', (req, res) => {
    let databaseName = req.params.databaseName;
    let queryString = req.params.queryString
    queryTable(databaseName, queryString)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log('queryTable', err.message)
        res.status(500).json({ error: err.message });
      });
  })

  return router;
};
