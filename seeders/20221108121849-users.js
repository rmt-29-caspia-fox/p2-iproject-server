'use strict';

const fs = require('fs')

const {encode} = require('../helper/hashPass')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = fs.readFileSync('./data/users.json', 'utf-8')
    data = JSON.parse(data)
    data = data.map(el => {
      el.password = encode(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
