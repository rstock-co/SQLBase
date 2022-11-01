const express = require("express");
const router = express.Router();

module.exports = ({ queryDBParams, queryDB }) => {
  router.put("/", (req, res) => {
    const schemaString = req.body.schemaString;
    const type = req.body.type;

    if (type === "saved_schema") {
      queryDBParams(
        `INSERT INTO databases (saved_schema) VALUES ($1) RETURNING *;`,
        [schemaString]
      )
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    }

    if (type === "state_schema") {
      queryDBParams(
        `INSERT INTO databases (state_schema) VALUES ($1) RETURNING *;`,
        [schemaString]
      )
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  router.get("/", (req, res) => {
    queryDB(
      `SELECT schema_string FROM databases ORDER BY created_at DESC LIMIT 1;`
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
