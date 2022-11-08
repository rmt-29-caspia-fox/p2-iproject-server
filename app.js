const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const app = express();
const port = 3000;
const { hashPass, comparePass } = require("./helpers/bcrypt");
const { encodeToken, decodeToken } = require("./helpers/jwt");
const { ObjectId } = require("mongodb");

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

app.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const userExisted = await db.collection("users").findOne({ email: email });
    if (userExisted) {
      throw { name: "email_duplicate" };
    }
    if (name === undefined || name == "") {
      throw { name: "name_required" };
    }
    if (email === undefined || email == "") {
      throw { name: "email_required" };
    }
    if (password === undefined || password == "") {
      throw { name: "password_required" };
    }
    password = hashPass(password);
    const rent = [];
    const newUser = await db
      .collection("users")
      .insertOne({ name, email, password, rent });

    res.status(201).json({ id: newUser.insertedId, email: email });
  } catch (error) {
    if (error.name == "name_required") {
      res.status(400).json({ message: "Name is required" });
    } else if (error.name == "email_required") {
      res.status(400).json({ message: "Email is required" });
    } else if (error.name == "email_duplicate") {
      res.status(400).json({ message: "Email is already registered" });
    } else if (error.name == "password_required") {
      res.status(400).json({ message: "Password is required" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});


