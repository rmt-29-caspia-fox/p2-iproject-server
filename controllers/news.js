const axios = require('axios');

class NewsController {
  static async data(req, res, next) {
    try {
      const {data} = await axios({
        url: `https://covid19.mathdro.id/api`,
        method: `get`
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async country(req, res, next) {
    try {
      const {data} = await axios({
        url: `https://api.covid19api.com/summary`,
        method: `get`
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async news(req, res, next) {
    try {
      let key = process.env.API_KEY
      const {data} = await axios({
        url: `https://newsapi.org/v2/top-headlines?country=id&apiKey=${key}`,
        method: `get`,
      })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }

}

module.exports = NewsController