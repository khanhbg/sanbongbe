'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Code.hasMany(models.Match, { sourceKey: 'value', foreignKey: 'hours', as: 'codeHours' });
      Code.belongsTo(models.Services, { targetKey: 'services', foreignKey: 'keyT', as: 'priceServices' });
    }
  }
  Code.init({
    type: DataTypes.STRING,
    keyT: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Code',
  });
  return Code;
};