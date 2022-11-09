const { Customer, WaitingList } = require("../models");

class CustomerController {
  static async register(req, res, next) {
    try {
      const { name, email, longitude,latitude } = req.body;
      const data = await Customer.create({ name, email, longitude,latitude });
      res.status(201).json({ id: data.id, email: data.email });
    } catch (err) {
      next(err);
    }
  } 
  static async addWaitingList(req, res, next) {
    try {
      const CustomerId = req.params.customerid;
      const { brand, name, licenseNumber, service } = req.body;
      const data = await WaitingList.create({
        brand,
        name,
        licenseNumber,
        service,
        CustomerId,
      });
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CustomerController;
