const { DataTypes } = require('sequelize');
const sequelize = require('../Utilites/dbConfig');
const Departments = require('./Departments');

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
    departmentId: {
      type: DataTypes.UUID,
      references: {
        model: Departments,
        key: 'id',
      },
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

Courses.belongsTo(Departments, {
  foreignKey: 'departmentId',
  as: 'department',
});

module.exports = Courses;
