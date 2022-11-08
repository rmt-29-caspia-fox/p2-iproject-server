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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === undefined || email == "") {
      throw { name: "email_required" };
    }
    if (password === undefined || password == "") {
      throw { name: "password_required" };
    }
    const user = await db.collection("users").findOne({ email: email });
    if (!user) {
      throw { name: "invalidLogin" };
    }

    if (!comparePass(password, user.password)) {
      throw { name: "invalidLogin" };
    }

    const payload = {
      id: user._id,
    };
    const access_token = encodeToken(payload);
    res.status(200).json({ access_token });
  } catch (error) {
    if (error.name == "invalidLogin") {
      res.status(401).json({ message: "Invalid email or password" });
    } else if(error.name == 'email_required') {
      res.status(400).json({ message: 'Email is required'})
    } else if(error.name == 'password_required') {
      res.status(400).json({ message: 'Password is required'})
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "invalidToken" };
    }

    const payload = decodeToken(access_token);
    const userLogin = await db
      .collection("users")
      .findOne({ _id: ObjectId(payload.id) });
    if (!userLogin) {
      throw { name: "invalidToken" };
    }

    req.user = {
      id: userLogin._id,
    };

    next();
  } catch (error) {
    if (error.name == "invalidToken" || error.name == "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.put("/vehicles/rent", async (req, res) => {
  try {
    const { vehicleId, startDate, endDate, duration, totalPrice } = req.body;
    const paymentStatus = false;
    await db
      .collection("users")
      .updateOne(
        { _id: ObjectId(req.user.id) },
        {
          $push: {
            rent: {
              vehicleId,
              startDate,
              endDate,
              duration,
              totalPrice,
              paymentStatus,
            },
          },
        }
      );
    res
      .status(200)
      .json({
        message: "Success rented the vehicle. Please finish the payment.",
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/vehicles/review/:vehicleId", async (req, res) => {
  try {
    const { msg, rating } = req.body;

    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.user.id) });
    const userId = user._id;
    const name = user.name;

    await db
      .collection("vehicles")
      .updateOne(
        { _id: ObjectId(req.params.vehicleId) },
        { $push: { reviews: { userId, name, msg, rating } } }
      );
    res.status(200).json({ message: "Success reviewed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});