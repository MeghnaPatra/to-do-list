// server/config/db.js
const pgp = require('pg-promise')();

const db = pgp('postgres://username:password@localhost:5432/todolist');  // Replace with your PostgreSQL credentials

module.exports = db;
