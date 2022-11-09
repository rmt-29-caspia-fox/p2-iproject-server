const axios = require('axios');

class HeroControl {
  static async allHero(req, res, next) {
    try {
      const { data } = await axios({
        url: 'https://api.dazelpro.com/mobile-legends/hero',
        method: 'get',
      });
      res.status(200).json({ hero: data.hero });
    } catch (err) {
      next(err);
    }
  }

  static async getHeroById(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        url: 'https://api.dazelpro.com/mobile-legends/hero/' + id,
        method: 'get',
      });

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  }

  static async getHeroByRole(req, res, next) {
    try {
      const { roleName } = req.query;
      const { data } = await axios({
        url: 'https://api.dazelpro.com/mobile-legends/role',
        method: 'get',
        params: { roleName },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getHeroBySpecially(req, res, next) {
    try {
      const { speciallyName } = req.query;
      const { data } = await axios({
        url: 'https://api.dazelpro.com/mobile-legends/specially',
        method: 'get',
        params: { speciallyName },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HeroControl;
