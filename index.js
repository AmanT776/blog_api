const express = require("express");
const app = express();
const db = require("./Config/db");
const { signup, login } = require("./Controller/Auth");
const router = require("express").Router();
const routes = require("./Route/index");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/api/v1/login", login);
app.post("/api/v1/signup", signup);
app.use("/api/v1", routes);

(async () => {
  try {
    await db.sync({ alter: true });
    console.log("all database synced");
    app.listen(PORT, () => {
      console.log(`the server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
