const { DataTypes } = require('sequelize');
const sequelize = require('../Utilites/dbConfig');

const Students = sequelize.define(
  'Students',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    passportSeries: {
      type: DataTypes.STRING,
    },
    passportNumber: {
      type: DataTypes.INTEGER,
    },
    passportDate: {
      type: DataTypes.DATEONLY,
    },
    passportLocation: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'students',
    timestamps: false,
  }
);

module.exports = Students;
