'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Giaidau', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenGiai: {
        type: Sequelize.STRING
      },
      mota: {
        type: Sequelize.STRING
      },
      soluongClb: {
        type: Sequelize.INTEGER
      },
      ngayBd: {
        type: Sequelize.DATE
      },
      ngayKt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Giaidau');
  }
};