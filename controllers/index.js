const axios = require("axios");
const { User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({ email, password });
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async gSearch(req, res, next) {
    try {
      const { query, pageNum } = req.body;
      let startIndex =0;
      if(pageNum){
        startIndex = (+pageNum-1 )* 10
      }
      const maxResults = 10;
      const key = "";
      const arrQ = query.split(" ").join("+")
      
      const { data } = await axios({
        method: "get",
        url: `https://www.googleapis.com/books/v1/volumes`,
        params: {
          q:arrQ,
          maxResults,
          filter:"free-ebooks",
          startIndex
        }
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
