'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = fs.readFileSync('./data/subproducts.json', 'utf-8')
    data = JSON.parse(data)
    data = data.map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Subproducts', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subproducts', null, {});
  }
};