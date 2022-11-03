const express = require("express");
const router = express.Router();

module.exports = ({ queryDBParams, queryDB }) => {
  router.put("/", (req, res) => {
    const { userID, databaseName, globalStateString } = req.body

    queryDBParams(
      `INSERT INTO databases (user_id, name,  global_state) VALUES ($1,$2,$3) RETURNING *;`,
      [userID, databaseName, globalStateString]
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    const { databaseID } = req.query
    console.log('id', databaseID)
    if (!databaseID) {
      queryDB(
        `SELECT global_state FROM databases ORDER BY created_at DESC LIMIT 1;`
      ).then(data => {
        res.json(data);
        console.log(data)
      })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    } else {
      queryDB(
        `SELECT global_state FROM databases WHERE ID = ${databaseID} LIMIT 1;`
      ).then(data => {
        res.json(data);
        console.log(data)
      })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  return router;
};
