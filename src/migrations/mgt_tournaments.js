'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tournaments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tournamentsName: {
                type: Sequelize.STRING
            },
            describe: {
                type: Sequelize.STRING
            },
            numberTeam: {
                type: Sequelize.INTEGER
            },
            timeStart: {
                type: Sequelize.DATE
            },
            timeEnd: {
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
        await queryInterface.dropTable('Tournaments');
    }
};