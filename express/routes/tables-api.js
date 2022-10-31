const express = require("express");
const router = express.Router();

module.exports = ({ queryDB }) => {
  return router.put("/", (req, res) => {
    const schemaString = req.body.schemaString;

    queryDB(`INSERT INTO databases (schema_string) VALUES ($1) RETURNING *;`, [
      schemaString,
    ])
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
};
