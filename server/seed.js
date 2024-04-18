import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS users(
    username TEXT,
    turns INTEGER
)
`);

const insertStatus = db.prepare(`
INSERT INTO users (username, turns) VALUES
(?, ?)
`);
