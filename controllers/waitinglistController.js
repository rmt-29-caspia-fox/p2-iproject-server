const { WaitingList, Customer } = require("../models");
const { getPagination, getPagingData } = require('../helpers/pagination');

class WaitingListController {
  static async getWaitinglist(req, res, next) {
    try {
      const { status } = req.query;
      let option = {
        order: [["createdAt", "desc"]],
        include: [Customer],
        where: {},
      };

      if(!status){
        option.where = {  };
      }else if (status !== "request" ) {
        option.where = { status };
      } else {
        option.where = { status: 'request' };
      }

      const data = await WaitingList.findAll(option);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getWaitinglistCustomer(req, res, next) {
    try {
      let { page } = req.query;
      if(page > 0){
        page = page -1
      }
      const { limit, offset } = getPagination(page);
      
      let option = {
        order: [["updatedAt", "asc"]],
        include: [Customer],
        limit: limit,
        offset: offset,
        where: {},
      };
      option.where = { status: ['done','waiting','onprogres'] };

      const data = await WaitingList.findAndCountAll(option)
      const response = getPagingData(data, page, limit);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async patchWaitlist(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await WaitingList.update({ status }, { where: { id } });
      res.status(200).json({message: 'Waitinglist has been updated'});
    } catch (err) {
      next(err);
    }
  }

  static async getWaitinglistById(req,res,next){
    try {
      const data = await WaitingList.findByPk(req.params.id,{include:[Customer]})
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = WaitingListController;
