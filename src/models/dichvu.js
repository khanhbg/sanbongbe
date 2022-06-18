'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dichvu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dichvu.init({
    tenDv: DataTypes.STRING,
    gia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dichvu',
  });
  return Dichvu;
};