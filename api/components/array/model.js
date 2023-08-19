const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../store/connexion');

const Array = sequelize.define('array', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstArray: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  lastArray: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  column: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 30,
    },
  },
});

module.exports = Array;
