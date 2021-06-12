const {
  Model,
  DataTypes
} = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    PrimaryKey: true,
    autoIncrement: true
  },
  categorie_name: {
    type: DataTypes.String,
    allowNull: false,
  }
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'category',
});

module.exports = Category;