'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten: {
        type: Sequelize.STRING
      },
      sdt: {
        type: Sequelize.STRING
      },
      mk: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      idClb: {
        type: Sequelize.INTEGER
      },
      ngaysinh: {
        type: Sequelize.DATE
      },
      gioitinh: {
        type: Sequelize.BOOLEAN
      },
      cannang: {
        type: Sequelize.STRING
      },
      chieucao: {
        type: Sequelize.STRING
      },
      vitri: {
        type: Sequelize.DATE
      },
      image: {
        type: Sequelize.STRING
      },
      tien: {
        type: Sequelize.INTEGER
      },
      vip: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Users');
  }
};