const { decodeToken } = require("../helpers/jwt");
const { Book, Category } = require("../models");
const { Op } = require("sequelize");

module.exports = class BookController {
  static async getAllBooks(req, res, next) {
    let options = {
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
      limit: 9,
      offset: req.query.page ? (req.query.page - 1) * 9 : 0,
      order: [["id", "ASC"]],
      distinct: true,
    };

    // Add Search by Name
    if(req.query) {
      options.where = {}
    }
    if (req.query.title) {
      options.where.title = { [Op.iLike]: `%${req.query.title}%` };
    }

    // Add Search by ISBN13
    if (req.query.isbn13) {
      options.where.isbn13 = { [Op.iLike]: `%${req.query.isbn13}%` };
    }
    // Add Search by ISBN10
    if (req.query.isbn10) {
      options.where.isbn10 = { [Op.iLike]: `%${req.query.isbn10}%` };
    }
    // Add Search by authors
    if (req.query.authors) {
      options.where.authors = { [Op.iLike]: `%${req.query.authors}%` };
    }

    // Add Category Filter
    if (req.query.category) {
      options.include[0].where = { name: { [Op.like]: req.query.category } };
    }

    try {
      const { rows, count } = await Book.findAndCountAll(options);
      const totalPages = Math.ceil(count / 9);

      let data = {
        count,
        totalPages,
        currentPage: options.offset / options.limit,
        books: rows,
      };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getBookById(req, res, next) {
    try {
      const bookId = req.params.id;
      const book = await Book.findByPk(bookId);
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
  static async addBook(req, res, next) {
    try {
      const {
        title,
        authors,
        description,
        publisher,
        publishDate,
        isbn13,
        isbn10,
        pages,
        stock,
        coverImage,
        CategoryId,
      } = req.body;
      const LibrarianId = req.user.id;

      const book = await Book.create({
        title,
        authors,
        description,
        publisher,
        publishDate,
        isbn13,
        isbn10,
        pages,
        stock,
        coverImage,
        CategoryId,
        LibrarianId,
      });
      res.status(201).json({ message: `${book.title} added successfully` });
    } catch (error) {
      next(error);
    }
  }
  static async updateBookById(req, res, next) {
    const id = req.params.id;

    const {
      title,
      authors,
      description,
      publisher,
      publishDate,
      isbn13,
      isbn10,
      pages,
      stock,
      coverImage,
      CategoryId,
    } = req.body;

    try {
      const updatedBook = await Book.update(
        {
          title,
          authors,
          description,
          publisher,
          publishDate,
          isbn13,
          isbn10,
          pages,
          stock,
          coverImage,
          CategoryId,
        },
        {
          where: { id: id },
        }
      );
      if (updatedBook > 0) {
        const message = `entity with id ${id} updated`;
        res.status(201).json({ message });
      } else {
        throw {
          name: "book_not_found",
          message: `book with id ${id} not found`,
        };
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteBookById(req, res, next) {
    try {
      const id = req.params.id;
      await Book.destroy({ where: { id: id } });
      res
        .status(200)
        .json({ name: "OK", message: "Book deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
};
