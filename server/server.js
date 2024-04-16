import express, { response } from "express";
import cors from "cors";
import Database from "better-sqlite3";
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8080;

const db = new Database("database.db");

//Get route
app.get("/", function (request, response) {
  const users = db.prepare("SELECT * FROM users").all();
  response.json(users);
});

// POST for submitting user and turns
app.post("/", function (request, response) {
  const { username, turns } = request.body;
  const insertStatement = db.prepare(
    "INSERT INTO game_results (username,turns) VALUES (?,?)"
  );
  insertStatement.run(username, turns);
  response.send("game result submitted succesfully");
});

//listen
app.listen(PORT, function () {
  console.log("server is listening to 8080...");
});
