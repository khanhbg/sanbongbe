'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tran extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Tran.belongsTo(models.Clb, { foreignKey: 'idDoinha', as: 'r_idDoinha' })
            Tran.belongsTo(models.Clb, { foreignKey: 'idDoiKhach', as: 'r_idDoikhach' })
        }
    }
    Tran.init({
        type: DataTypes.STRING,
        idDoinha: DataTypes.INTEGER,
        idDoikhach: DataTypes.INTEGER,
        gio: DataTypes.STRING,
        ngay: DataTypes.DATE,
        goalDoinha: DataTypes.INTEGER,
        goalDoikhach: DataTypes.INTEGER,
        phi: DataTypes.INTEGER,
        ungtruoc: DataTypes.INTEGER,
        idGiai: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Tran',
    });
    return Tran;
};