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
      User.hasMany(models.Match, { foreignKey: 'idHomeTeam', as: 'r_idHomeTeam' })
      User.hasMany(models.Match, { foreignKey: 'idGuestTeam', as: 'r_idGuestTeam' })
      User.hasMany(models.Comment, { foreignKey: 'idUser', as: 'r_idUser' })
    }
  }
  User.init({
    userName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    nameTeam: DataTypes.STRING,
    describe: DataTypes.STRING,//mo ta clb
    idTournament: DataTypes.INTEGER,
    image: DataTypes.BLOB,
    pointRank: DataTypes.INTEGER,
    money: DataTypes.INTEGER,
    vip: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};