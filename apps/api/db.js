const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;

async function init() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS transcripts (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL
  )`);
}

module.exports.init = init;
