'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tkbc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tkbc.init({
    thoigian: DataTypes.STRING,
    sotran: DataTypes.INTEGER,
    doanhthu: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tkbc',
  });
  return tkbc;
};