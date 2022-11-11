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
  router.post("/", (req, res) => {
    const { userID, databaseName, globalStateString, databaseUuid } = req.body
    queryDBParams(
      `INSERT INTO databases (user_id, name,  global_state, database_uuid) VALUES ($1,$2,$3,$4) 
        ON CONFLICT (database_uuid)
        DO UPDATE SET global_state = ($3)      
        RETURNING *;`,
      [userID, databaseName, globalStateString, databaseUuid]
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete("/", (req, res) => {
    const { databaseUuid } = req.query
    console.log(req)
    queryDB(
      `DELETE FROM databases WHERE database_uuid = '${databaseUuid}' RETURNING *;`
    ).then(data => {
      res.json(data);
    })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  })

  router.get("/", (req, res) => {
    const { uuid } = req.query
    console.log('tables-api uuid', uuid)
    // console.log('id', databaseID)
    if (!uuid) {
      queryDB(
        `SELECT global_state FROM databases ORDER BY created_at DESC LIMIT 1;`
      ).then(data => {
        res.json(data);
        console.log(data)
      })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    }
    else {
      queryDB(`
        SELECT global_state FROM databases WHERE database_uuid = '${uuid}';      
      `
      ).then(data => {
        res.json(data);
        // console.log(data)
      })
        .catch(err => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  return router;
};
