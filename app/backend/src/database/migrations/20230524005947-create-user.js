'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users', 
      { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userName: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'user_name',
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
    );
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  }
};
