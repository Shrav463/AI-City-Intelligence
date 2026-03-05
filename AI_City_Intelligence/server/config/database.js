// server/config/database.js
const Database = require('better-sqlite3');
const path     = require('path');
const fs       = require('fs');

const DB_PATH = process.env.DB_PATH
  ? path.resolve(__dirname, '..', process.env.DB_PATH)
  : path.resolve(__dirname, '../db/cities.db');

let db;

function getDB() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

function initDB() {
  const database = getDB();

  database.exec(`
    CREATE TABLE IF NOT EXISTS cities (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      country     TEXT NOT NULL,
      region      TEXT NOT NULL,
      continent   TEXT NOT NULL,
      population  TEXT NOT NULL,
      founded     TEXT NOT NULL,
      timezone    TEXT NOT NULL,
      currency    TEXT NOT NULL,
      language    TEXT NOT NULL,
      summary     TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS city_pros (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      city_id  TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
      text     TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS city_cons (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      city_id  TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
      text     TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS dimensions (
      key       TEXT PRIMARY KEY,
      label     TEXT NOT NULL,
      icon      TEXT NOT NULL,
      color     TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS city_scores (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      city_id        TEXT NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
      dimension_key  TEXT NOT NULL REFERENCES dimensions(key) ON DELETE CASCADE,
      score          INTEGER NOT NULL CHECK(score BETWEEN 0 AND 100),
      updated_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(city_id, dimension_key)
    );
  `);

  console.log('  ▸ Database initialised');
  return database;
}

module.exports = { getDB, initDB };
