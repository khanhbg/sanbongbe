'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class San extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  San.init({
    tensan: DataTypes.STRING,
    vitri: DataTypes.STRING,
    diachi: DataTypes.STRING,
    sdt: DataTypes.STRING,
    thoigian: DataTypes.STRING,
    mota: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'San',
  });
  return San;
};