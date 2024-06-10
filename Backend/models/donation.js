'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    static associate(models) {
      Donation.belongsTo(models.Donor, {
        foreignKey: 'donorId',
        as: 'donor',
        onDelete: 'CASCADE'
      })
      Donation.belongsTo(models.BloodBank, {
        foreignKey: 'bloodBankId',
        as: 'bloodBank',
        onDelete: 'CASCADE'
      })
    }
  }
  Donation.init({
    group: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures the group is not empty
      },
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true, // Ensures it is a valid date
        isAfter: new Date().toISOString(), // Ensures the date is not in the past
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          min: 1, // Ensures the quantity is a positive integer
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Donation',
  });
  return Donation;
};