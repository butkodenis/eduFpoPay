const { DataTypes } = require('sequelize');
const sequelize = require('../Utilites/dbConfig');

const Departments = sequelize.define(
  'Departments',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    departmentName: {
      type: DataTypes.STRING,
    },
    departmentDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'departments',
    timestamps: false,
  }
);

module.exports = Departments;
