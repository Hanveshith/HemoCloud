'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    static associate(models) {
      Hospital.hasOne(models.BloodCollection, {
        foreignKey: 'hospitalId',
        as: 'bloodCollection',
        onDelete: 'CASCADE'
      })
      Hospital.hasMany(models.Request, {
        foreignKey: 'hospitalId',
        as: 'requests',
        onDelete: 'CASCADE'
      })
    }
  }
  Hospital.init({
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures the name is not empty
      },
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures the address is not empty
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^\d{10}$/, // Validates 10 digit phone numbers
      },
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isFloat: true, // Ensures it is a valid float value
      },
    },
    Longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isFloat: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Hospital',
  });
  return Hospital;
};