'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pitch extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Pitch.hasMany(models.Match, { foreignKey: 'idPitch', as: 'r_idPitch' })
        }
    }
    Pitch.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Pitch',
    });
    return Pitch;
};