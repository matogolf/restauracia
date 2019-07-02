'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tables', [
      {
        id: 1,
        name: 'Stol',
        seatCount: 4,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 2,
        name: 'Stol',
        seatCount: 4,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        name: 'Stol',
        seatCount: 4,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        name: 'Stol',
        seatCount: 4,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 5,
        name: 'Stol',
        seatCount: 4,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 6,
        name: 'Stol',
        seatCount: 8,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 7,
        name: 'Stol',
        seatCount: 8,
        roomId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Tables', null, {})
  }
}
