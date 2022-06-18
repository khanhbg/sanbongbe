'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChitietPhi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChitietPhi.init({
    idTran: DataTypes.INTEGER,
    idDv: DataTypes.INTEGER,
    soluong: DataTypes.INTEGER,
    gia: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ChitietPhi',
  });
  return ChitietPhi;
};