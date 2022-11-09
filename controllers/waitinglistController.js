const { WaitingList, Customer } = require("../models");

class WaitingListController {
  static async getWaitinglist(req, res, next) {
    try {
      const data = await WaitingList.findAll({
        order: [["createdAt", "asc"]],
        include: [Customer]
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = WaitingListController;
