'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('San', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tensan: {
        type: Sequelize.STRING
      },
      vitri: {
        type: Sequelize.STRING
      },
      diachi: {
        type: Sequelize.STRING
      },
      sdt: {
        type: Sequelize.STRING
      },
      thoigian: {
        type: Sequelize.STRING
      },
      mata: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('San');
  }
};