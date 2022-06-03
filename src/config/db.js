const { Pool } = require('pg');
const {
  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT,
} = require('../utils/env');

const db = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

module.exports = db;
