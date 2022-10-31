module.exports = db => {
  const queryDB = (queryString, paramsArray = []) => {
    const query = {
      text: queryString,
      values: paramsArray,
    };
    return db
      .query(query)
      .then(result => result.rows)
      .catch(err => err);
  };

  // Schema tables

  // Boilerplate examples below (not currently used)

  const getUsers = () => queryDB("SELECT * FROM users");

  const getUserByEmail = () =>
    queryDB(`SELECT * FROM users WHERE email = $1`, [email]);

  const addUser = () =>
    queryDB(
      `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      [firstName, lastName, email, password]
    );

  const getUsersPosts = () =>
    queryDB(`SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
        FROM users
        INNER JOIN posts
        ON users.id = posts.user_id`);

  return {
    queryDB,
  };
};
