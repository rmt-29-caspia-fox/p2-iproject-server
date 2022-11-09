const { comparingPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Admin } = require("../models");
const nodemailer = require("nodemailer");

class AdminController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const data = await Admin.create({ username, email, password });
      res.status(201).json({ id: data.id, email: data.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "email_required" };
      }
      if (!password) {
        throw { name: "password_required" };
      }

      const data = await Admin.findOne({ where: { email } });
      if (!data) {
        throw { name: "invalidLogin" };
      }
      if (!comparingPassword(password, data.password)) {
        throw { name: "invalidLogin" };
      }

      const access_token = signToken(data.id);
      res.status(200).json({ access_token });
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
        subject: `Route to ${email}`,
        text: "you can follow this link to get route",
        html: `
        <h2>Hello</h2>
        <br/><br/>
        <p>you can click button below here to get route from google map</p>
        <br/>
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

module.exports = AdminController;
