'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tournaments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Tournaments.init({
        tournamentsName: DataTypes.STRING,
        describe: DataTypes.STRING,
        numberTeam: DataTypes.INTEGER,
        timeStart: DataTypes.DATE,
        timeEnd: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Tournaments',
    });
    return Tournaments;
};