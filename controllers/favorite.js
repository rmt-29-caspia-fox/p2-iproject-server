const { Favorite, User } = require('../models');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { info } = require('console');

class FavControl {
  static async addFav(req, res, next) {
    try {
      const { heroId } = req.params;
      const { data } = await axios({
        url: 'https://api.dazelpro.com/mobile-legends/hero/' + heroId,
        method: 'get',
      });
      const fav = await Favorite.create({ UserId: req.user.id, hero: data.hero });
      res.status(201).json(fav);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteFav(req, res, next) {
    try {
      const { id } = req.params;
      await Favorite.destroy({ where: { id } });
      res.status(200).json({ message: 'Favorite has been deleted' });
    } catch (err) {
      next(err);
    }
  }

  static async getFav(req, res, next) {
    try {
      const fav = await Favorite.findAll();
      res.status(200).json(fav);
    } catch (err) {
      next(err);
    }
  }

  static async sendMail(req, res, next) {
    try {
      const fav = await Favorite.findAll()

      const list = fav.map(el => {
        return el.hero.map(x => {
          return x.hero_name
        })
      })
      const user = await User.findByPk(req.user.id)

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.gmail_email,
          pass: process.env.gmail_password,
        },        
      });

      const mailOptions = {
        from: process.env.gmail_email,
        to: user.email,
        subject: "Subject",
        text: "Email From",
        html: `<p>${list}</p>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          // do something useful
        }
      });
      console.log(user);
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FavControl;
