'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'idUser', as: 'r_idUser' })
    }
  }
  Comment.init({
    type: DataTypes.STRING,
    idPosts: DataTypes.INTEGER,
    star: DataTypes.FLOAT,
    content: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    day: DataTypes.DATE,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};