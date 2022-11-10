const express = require("express");
const cors = require("cors");
const { connectToDb, getDb } = require("./db");
const app = express();
const port = 3000;
const { hashPass, comparePass } = require("./helpers/bcrypt");
const { encodeToken, decodeToken } = require("./helpers/jwt");
const { ObjectId } = require("mongodb");
const midtransClient = require("midtrans-client");
const SERVER_KEY = 'SB-Mid-server-qqmfBfQpxzgn-GlHq_SMgLWR';
const CLIENT_KEY = 'SB-Mid-client-FYlYYii3GW9F6Nre';
const nodemailer = require("nodemailer");

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
    } else if (error.name == "email_required") {
      res.status(400).json({ message: "Email is required" });
    } else if (error.name == "password_required") {
      res.status(400).json({ message: "Password is required" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

app.get("/vehicles", (req, res) => {
  let vehicles = [];
  db.collection("vehicles")
    .find()
    .forEach((vehicle) => {
      vehicles.push(vehicle);
    })
    .then(() => {
      res.status(200).json(vehicles);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

app.get("/vehicles/:id", async (req, res) => {
  try {
    const car = await db
      .collection("vehicles")
      .findOne({ _id: ObjectId(req.params.id) });
    if (!car) {
      throw { name: "notFound" };
    }
    res.status(200).json(car);
  } catch (error) {
    if (error.name == "notFound") {
      res.status(404).json({ message: "Vehicle is not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

//

// app.post("/vehicles/add", async(req, res) => {
//   try {
//     const vehicles = req.body
//     await db.collection("vehicles").insertMany(vehicles)
//     res.status(201).json({message: 'Success add vehicles'})
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Internal server error'})
//   }
// })

// app.post("/users/add", async(req, res) => {
//   try {
//     const users = req.body
//     await db.collection("users").insertMany(users)
//     res.status(201).json({message: 'Success add vehicles'})
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Internal server error'})
//   }
// })

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
    await db.collection("users").updateOne(
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
    res.status(200).json({
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

app.get("/myrent", async (req, res) => {
  try {
    const rents = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.user.id) });
    res.status(200).json({ name: rents.name, rents: rents.rent });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/mydetail", async(req, res) => {
  try {
    const user = await db.collection("users").findOne({ _id: ObjectId(req.user.id)})
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error'})
  }
})

app.get("/vehicles/rent/pay/detail/:vehicleId", async (req, res) => {
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.user.id) });

    const toPay = user.rent.filter(el => el.vehicleId == String(req.params.vehicleId) && el.paymentStatus === false)
    res.status(200).json({user: user.name, email: user.email, toPay})
  } catch (error) {
    res.status(500).json({ message: 'Internal server error'})
  }
})

// app.get("/payment/midtrans/:id", async (req, res) => {
//   try {
//     const user = await db
//       .collection("users")
//       .findOne({ _id: ObjectId(req.user.id) });

//     let snap = new midtransClient.Snap({
//       isProduction: false,
//       serverKey: "SB-Mid-server-qqmfBfQpxzgn-GlHq_SMgLWR",
//     });

//     let parameter = {
//       transaction_details: {
//         order_id: "ORDERID-" + user._id,
//         gross_amount: +user.rent[+req.params.id].totalPrice,
//       },
//       credit_card: {
//         secure: true,
//       },
//       customer_details: {
//         name: user.name,
//         email: user.email,
//       },
//     };

//     snap.createTransaction(parameter).then((transaction) => {
//       // transaction token
//       let transactionToken = transaction.token;
//       console.log("transactionToken:", transactionToken);
//       res.status(200).json({transactionToken})
//     });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Internal server error'})
//   }
// });

app.get("/payment/:id/checkout", async (req, res) => {
  try {
    let snap = new midtransClient.Snap({
      isProduction : false,
      serverKey : SERVER_KEY,
      clientKey : CLIENT_KEY
    });
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.user.id) });

      let parameter = {
        "transaction_details": {
          "order_id": "order-id-"+Math.round((new Date()).getTime() / 1000) + user._id,
          "gross_amount": +user.rent[+req.params.id - 1].totalPrice,
        }, "credit_card":{
          "secure" : true
        }
      };

      const transactionToken = await snap.createTransactionToken(parameter)
      res.status(200).json({ token: transactionToken, clientKey: snap.apiConfig.clientKey})
  } catch (error) {
    console.log(error)
    if(error.name == 'notFound') {
      res.status(404).json({ message: 'Transaction is not found'})
    } else {
      res.status(500).json({ message: 'Internal server error'})
    }
  }
})

app.post("/mailer", async(req, res) => {
  try {
    const { email, url, qrcode } = req.body
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'irwand.syah@gmail.com', // generated ethereal user
        pass: 'pynqzljbycfoplld', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
     await transporter.sendMail({
      from: '"RentalKita" <payment@rentalkita.com>', // sender address
      to: email, // list of receivers
      subject: "Payment issued from your order at RentalKita", // Subject line
      text: "Thank you for your order at RentalKita. To finish your order, please complete the payment by clicking or scanning qr code below.", // plain text body
      attachments: [{
        filename: 'picture.png',
        path: qrcode,
        cid: 'qrcode2022'
    }],
      html: `<p>Thank you for your order at RentalKita. To finish your order, please complete the payment by clicking or scanning qr code below. You can just ignore this if you already completed the payment.</p><br>
      <a href="${url}">Finish your payment here</a><br>
      <p>Or</p><br>
      <img src="cid:qrcode2022">`,
    });

    res.status(200).json({ message: 'Email sent'})
  } catch (error) {
    res.status(500).json({ message: 'Internal server error'})
  }
})