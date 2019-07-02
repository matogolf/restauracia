'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('EmployeePositions', [
      {
        id: 1,
        name: 'Manager',
        detail: 'Boss',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Čašník',
        detail: 'Obsluha zákazníkov',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 3,
        name: 'Kuchár',
        detail: 'Pripravuje jedlá',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 4,
        name: 'Barman',
        detail: 'Obsluha u baru',
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
    return queryInterface.bulkDelete('EmployeePositions', null, {})
  }
}
