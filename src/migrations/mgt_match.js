'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Match', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idPitch: {
                type: Sequelize.INTEGER
            },
            keyT: {
                type: Sequelize.STRING //DA GIAI, GIAO LUU..
            },
            idHomeTeam: {
                type: Sequelize.INTEGER
            },
            idGuestTeam: {
                type: Sequelize.INTEGER
            },
            hours: {
                type: Sequelize.STRING
            },
            day: {
                type: Sequelize.DATE
            },
            goalHomeTeam: {
                type: Sequelize.INTEGER
            },
            goalGuestTeam: {
                type: Sequelize.INTEGER
            },
            deposit: {
                type: Sequelize.INTEGER
            },
            idTournament: {
                type: Sequelize.INTEGER
            },
            isComplete: {
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
        await queryInterface.dropTable('Match');
    }
};