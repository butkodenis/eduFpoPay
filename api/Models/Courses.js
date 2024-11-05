const { DataTypes } = require('sequelize');
const sequelize = require('../Utilites/dbConfig');

const Courses = sequelize.define(
  'Courses',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    courseType: {
      type: DataTypes.STRING,
    },
    courseName: {
      type: DataTypes.STRING,
    },
    coursePrice: {
      type: DataTypes.INTEGER,
    },
    coursePoints: {
      type: DataTypes.INTEGER,
    },
    courseDepartment: {
      type: DataTypes.STRING,
    },
    courseDateStart: {
      type: DataTypes.DATEONLY,
    },
    courseDateEnd: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: 'courses',
    timestamps: false,
  }
);

module.exports = Courses;
