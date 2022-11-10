const axios = require('axios');

class School {
  static async allSchool(req, res, next) {
    try {
      const { page } = req.query;
      console.log(page);
      const payload = { page, perPage: 10};
      const { data } = await axios({
        url: 'https://api-sekolah-indonesia.herokuapp.com/sekolah',
        method: 'get',
        params: payload,
      });
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async searchSchool(req, res, next) {
    try {
      const { type } = req.params;
      const { page } = req.query;
      const payload = { page, perPage: 100000 };
      const { data } = await axios({
        url: `https://api-sekolah-indonesia.herokuapp.com/sekolah/${type}`,
        method: 'get',
        params: payload,
      });
      res.status(200).json(data)
    } catch (err) {
      next(err);
    }
  }
}

module.exports = School;
