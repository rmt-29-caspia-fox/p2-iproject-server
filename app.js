const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    db = getDb();
  }
});


