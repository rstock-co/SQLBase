const express = require("express");
const router = express.Router();

module.exports = ({ queryDBParams, queryDB }) => {
  router.put("/", (req, res) => {
    const globalStateString = req.body.globalStateString;

    queryDBParams(
      `INSERT INTO databases (global_state) VALUES ($1) RETURNING *;`,
      [globalStateString]
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    queryDB(
      `SELECT global_state FROM databases ORDER BY created_at DESC LIMIT 1;`
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
