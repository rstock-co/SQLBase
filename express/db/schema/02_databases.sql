DROP TABLE IF EXISTS databases CASCADE;
DROP TABLE IF EXISTS schema_forms CASCADE;
DROP TABLE IF EXISTS query_forms CASCADE;
CREATE TABLE databases(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  saved_schema TEXT,
  state_schema TEXT,
  query_string TEXT,
  seed_string TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL
);
CREATE TABLE schema_forms(
  id SERIAL PRIMARY KEY NOT NULL,
  database_id INTEGER REFERENCES databases(id) ON DELETE CASCADE,
  schema_form_json json,
  form_schema_string TEXT
);
CREATE TABLE query_forms(
  id SERIAL PRIMARY KEY NOT NULL,
  database_id INTEGER REFERENCES databases(id) ON DELETE CASCADE,
  query_form_json json,
  form_schema_string TEXT
);
