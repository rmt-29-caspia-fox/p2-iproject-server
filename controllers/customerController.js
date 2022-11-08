const { Customer,WaitingList } = require("../models");

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
  static async addWaitingList(req,res,next){
    try {
        const CustomerId = req.params.customerid
        const { brand, name, status, licenseNumber, service} = req.body
        const data = await WaitingList.create({brand,name,status,licenseNumber,service, CustomerId})
        res.status(201).json(data);
    } catch (err) {
        next(err)
    }
  }
}

module.exports = CustomerController;
