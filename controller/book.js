const { Book } = require('../models');

module.exports = class BookController {
  static async getAllBooks(req, res, next) {
    try {
      const books = await Book.findAll()
      res.status(200).json(books)
    } catch (error) {
      next(error)
    }
  }
  static async getBookById(req, res, next) {
    try {
      const bookId = req.params.id
      const book = await Book.findByPk(bookId)
      res.status(200).json(book)
    } catch (error) {
      next(error)
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
      const LibrarianId = req.user.id

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
        LibrarianId
      })
      res.status(201).json({ message: `${book.title} added successfully` });
    } catch (error) {
      next(error)
    }
  }
  static async updateBookById(req, res, next) {
    const librarianId = req.user.id;
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
        Controller.addLog(librarianId, name, message);
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
  static async deleteBookById(req, res, next) {}
};
