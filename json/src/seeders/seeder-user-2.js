'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: 'thanh123',
      firstName: 'thanh',
      lastName: 'nguyeh trung',
      address: 'VN',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};