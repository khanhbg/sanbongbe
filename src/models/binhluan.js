'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Binhluan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Binhluan.init({
    type: DataTypes.STRING,
    idBaiviet: DataTypes.INTEGER,
    sao: DataTypes.FLOAT,
    noidung: DataTypes.STRING,
    ngay: DataTypes.DATE,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Binhluan',
  });
  return Binhluan;
};