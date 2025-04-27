// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

db.serialize(function() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      discipline TEXT NOT NULL
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY,
      group_id INTEGER NOT NULL,
      day TEXT NOT NULL,
      time TEXT NOT NULL,
      subject TEXT NOT NULL,
      teacher TEXT NOT NULL,
      FOREIGN KEY (group_id) REFERENCES groups (id)
    );
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);
});

module.exports = db;
