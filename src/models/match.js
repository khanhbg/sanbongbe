'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Match extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Match.belongsTo(models.User, { foreignKey: 'idHomeTeam', as: 'r_idHomeTeam' })
            Match.belongsTo(models.User, { foreignKey: 'idGuestTeam', as: 'r_idGuestTeam' })
            // Match.belongsTo(models.Code, { targetKey: 'keyT', foreignKey: 'keyT', as: 'codeMatch' });
            Match.belongsTo(models.Code, { targetKey: 'value', foreignKey: 'hours', as: 'codeHours' });
            Match.belongsTo(models.Services, { targetKey: 'services', foreignKey: 'keyT', as: 'matchServices' });
            Match.belongsTo(models.Pitch, { foreignKey: 'idPitch', as: 'r_idPitch' })
        }
    }
    Match.init({
        keyT: DataTypes.STRING,
        idPitch: DataTypes.INTEGER,
        idHomeTeam: DataTypes.INTEGER,
        idGuestTeam: DataTypes.INTEGER,
        hours: DataTypes.STRING,
        day: DataTypes.DATE,
        goalHomeTeam: DataTypes.INTEGER,
        goalGuestTeam: DataTypes.INTEGER,
        idTournament: DataTypes.INTEGER, //giai dau
        deposit: DataTypes.INTEGER, //tien coc
        isComplete: DataTypes.BOOLEAN

    }, {
        sequelize,
        modelName: 'Match',
    });
    return Match;
};