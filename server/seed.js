import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY,
    username TEXT,
    turns INTEGER
)
`);
