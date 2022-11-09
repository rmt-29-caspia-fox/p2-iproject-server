'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const books = require('../data/books.json').map(book => {
    book.createdAt = book.updatedAt = new Date()
    return book
   })
   await queryInterface.bulkInsert('Books', books, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Books', null, {});
  }
};
