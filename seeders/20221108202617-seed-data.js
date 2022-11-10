'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
		const games = require('../db/games.json')
		games.forEach(g => {
			g.createdAt = g.updatedAt = new Date()
		})

		const gameItems = require('../db/gameItems.json')
		gameItems.forEach(i => {
			i.createdAt = i.updatedAt = new Date()
		})

		await queryInterface.bulkInsert("Games",games)
		await queryInterface.bulkInsert("GameItems",gameItems)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null, {
			truncate: true,
			restartIdentity: true,
			cascade: true
		})

		await queryInterface.bulkDelete("GameItems", null, {
			truncate: true,
			restartIdentity: true,
			cascade: true
		})
  }
};
