const { Customer, WaitingList } = require("../models");
const nodemailer = require("nodemailer");

class CustomerController {
  static async register(req, res, next) {
    try {
      const { name, email } = req.body;
      const data = await Customer.create({ name, email });
      res.status(201).json({ id: data.id, email: data.email });
    } catch (err) {
      next(err);
    }
  }
  static async addWaitingList(req, res, next) {
    try {
      const CustomerId = req.params.customerid;
      const { brand, name, status, licenseNumber, service } = req.body;
      const data = await WaitingList.create({
        brand,
        name,
        status,
        licenseNumber,
        service,
        CustomerId,
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async mailer(req, res, next) {
    try {
      const { email, coordinate } = req.body;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: "Route",
        text: "you can follow this link to get route",
        html: `
        <h2>Hello</h2>
        <p>you can click button below here to get route from google map</p>
        <a href="https://www.google.com/maps/dir/-5.3631762,105.2911422/Car+Wash+Dewi+Ayu,+Jl.+Airan+Raya,+Way+Huwi,+Kec.+Jati+Agung,+Kabupaten+Lampung+Selatan,+Lampung+35131/@${coordinate}z">click here</a>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw { name: "emailWrong" };
        }
        res.status(200).json({ message: `Email sent to: ${email}` });
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;
