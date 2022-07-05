'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Services.hasMany(models.Match, { foreignKey: 'services', as: 'servicesMatch' });
      Services.hasMany(models.Code, { foreignKey: 'keyT', as: 'priceServices' });
      Services.hasMany(models.Match, { foreignKey: 'keyT', as: 'matchServices' });


    }
  }
  Services.init({
    services: DataTypes.STRING,
    price: DataTypes.INTEGER //gia ca
  }, {
    sequelize,
    modelName: 'Services',
  });
  return Services;
};