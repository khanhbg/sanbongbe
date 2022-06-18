'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clb.hasMany(models.User, { foreignKey: 'idClb', as: 'r_idClb' })
      Clb.belongsTo(models.User, { foreignKey: 'idDoitruong', as: 'r_idDoitruong' })
      Clb.hasMany(models.Tran, { foreignKey: 'idDoinha', as: 'r_idDoinha' })
      Clb.hasMany(models.Tran, { foreignKey: 'idDoiKhach', as: 'r_idDoikhach' })
    }
  }
  Clb.init({
    tenClb: DataTypes.STRING,
    mota: DataTypes.STRING,
    idGiaidau: DataTypes.INTEGER,
    idDoitruong: DataTypes.INTEGER,
    image: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Clb',
  });
  return Clb;
};