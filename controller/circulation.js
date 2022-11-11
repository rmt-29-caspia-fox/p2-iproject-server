const { Book, User, UserBook } = require("../models");

module.exports = class CirculationController {
  static async getBorrowRequest(req, res, next) {
    try {
      const borrowRequest = await UserBook.findAll({
        where: { status: "Pending" },
      });
      res.status(200).json(borrowRequest);
    } catch (error) {
      next(error);
    }
  }
  static async postBorrowRequest(req, res, next) {
    const UserId = req.user.id;
    const BookId = req.params.id;
    try {
      const requestedBook = await UserBook.create({
        UserId,
        BookId,
        status: "Pending",
      });
      res.status(201).json({
        message: `Your request to borrow book with id ${requestedBook.id} has been sent`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async approveRequest(req, res, next) {
    const id = req.params.id;
    try {
      const { BookId } = await UserBook.findByPk(id);
      const book = await Book.findByPk(BookId);
      if (book.stock) {
        await Book.update({ stock: book.stock - 1 }, { where: { id: BookId } });
        await UserBook.update({ status: "Approved" }, { where: { id } });
        res.status(200).json({ message: `request with id ${id} approved` });
      } else {
        throw { name: "out_of_stock" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async getApprovedList(req, res, next) {
    try {
      const approvedRequest = await UserBook.findAll({
        where: { status: "Approved" },
      });
      res.status(200).json(approvedRequest);
    } catch (error) {
      next(error);
    }
  }
  static async bookOut(req, res, next) {
    const id = req.params.id;
    try {
      await UserBook.update({ status: "Out" }, { where: { id } });
      res.status(200).json({ message: `book with id ${id} is out` });
    } catch (error) {
      next(error);
    }
  }
  static async getBookOut(req, res, next) {
    try {
      const bookOutList = await UserBook.findAll({ where: { id } });
      res.status(200).json(bookOutList);
    } catch (error) {
      next(error);
    }
  }
  static async bookReturned(req, res, next) {
    //TODO: mengubah status record pada table UserBook menjadi returned
    const id = req.params.id;
    try {
      const { BookId } = await UserBook.findByPk(id);
      const book = await Book.findByPk(BookId);
      await Book.update({ stock: book.stock + 1 }, { where: { id: BookId } });
      await UserBook.update({ status: "Returned" }, { where: { id } });
      res.status(200).json({ message: `book with id ${BookId} returned` });
    } catch (error) {
      next(error);
    }
  }
};
