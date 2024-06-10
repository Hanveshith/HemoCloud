'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodBank extends Model {
    static associate(models) {
      BloodBank.hasMany(models.DonatingAppointment, {
        foreignKey: 'bloodBankId',
        as: 'donatingAppointments',
        onDelete: 'CASCADE'
      })
      BloodBank.hasMany(models.Donation, {
        foreignKey: 'bloodBankId',
        as: 'donations',
        onDelete: 'CASCADE'
      })
      BloodBank.hasOne(models.Donor, {
        foreignKey: 'bloodBankId',
        as: 'donors',
        onDelete: 'CASCADE'
      })
      BloodBank.hasOne(models.BloodCollection, {
        foreignKey: 'bloodBankId',
        as: 'bloodCollections',
        onDelete: 'CASCADE'
      })
      BloodBank.hasMany(models.Request,{
        foreignKey: 'bloodBankId',
        as: 'requests',
        onDelete: 'CASCADE'
      })
    }
  }
  BloodBank.init({
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
    modelName: 'BloodBank',
  });
  return BloodBank;
};