'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Clb, { foreignKey: 'idClb', as: 'r_idClb' })
      User.hasOne(models.Clb, { foreignKey: 'idDoitruong', as: 'r_Doitruong' })
    }
  }
  User.init({
    ten: DataTypes.STRING,
    sdt: DataTypes.STRING,
    mk: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    idClb: DataTypes.INTEGER,
    ngaysinh: DataTypes.DATE,
    gioitinh: DataTypes.BOOLEAN,
    cannang: DataTypes.STRING,
    chieucao: DataTypes.STRING,
    vitri: DataTypes.STRING,
    image: DataTypes.STRING,
    tien: DataTypes.INTEGER,
    vip: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};