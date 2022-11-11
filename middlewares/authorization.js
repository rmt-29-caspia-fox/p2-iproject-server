const { Book } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const user = req.user;

    const book = await Book.findByPk(bookId);
    if (!book) throw { name: "book_not_found" };

    if (user.role === "Admin") {
      next();
    } else if (user.role === "Staff") {
      if (book.librarianId !== user.id) {
        throw {
          name: "user_not_authorized",
        };
      } else {
        next();
      }
    } else {
      throw { name: "user_not_authorized" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
