const express = require("express");
const app = express();
const db = require("./Config/db");

require("dotenv").config();
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.sync({ force: true });
    console.log("all database synced");
    app.listen(PORT, () => {
      console.log(`the server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
