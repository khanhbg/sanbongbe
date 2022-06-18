'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Giaidau extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Giaidau.init({
    tenGiai: DataTypes.STRING,
    mota: DataTypes.STRING,
    soluongClb: DataTypes.INTEGER,
    ngayBd: DataTypes.DATE,
    ngayKt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Giaidau',
  });
  return Giaidau;
};