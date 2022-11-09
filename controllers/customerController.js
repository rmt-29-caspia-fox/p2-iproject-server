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
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: process.env.GMAIL_EMAIL,
        subject: "Subject",
        text: "Email content",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (!error) {
          throw {name: name}
        } else {
          console.log("Email sent: " + info.response);
          // do something useful
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;
