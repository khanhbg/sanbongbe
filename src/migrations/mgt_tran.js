'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tran', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING //DA GIAI, GIAO LUU..
            },
            idDoinha: {
                type: Sequelize.INTEGER
            },
            idDoikhach: {
                type: Sequelize.INTEGER
            },
            gio: {
                type: Sequelize.STRING
            },
            ngay: {
                type: Sequelize.DATE
            },
            goalDoinha: {
                type: Sequelize.INTEGER
            },
            goalDoikhach: {
                type: Sequelize.INTEGER
            },
            phi: {
                type: Sequelize.INTEGER
            },
            ungtruoc: {
                type: Sequelize.INTEGER
            },
            idGiai: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Tran');
    }
};