'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DonatingAppointment extends Model {
    static associate(models) {
      DonatingAppointment.belongsTo(models.Donor, {
        foreignKey: 'donorId',
        as: 'donor',
        onDelete: 'CASCADE'
      })
      DonatingAppointment.belongsTo(models.BloodBank, {
        foreignKey: 'bloodBankId',
        as: 'bloodBank',
        onDelete: 'CASCADE'
      })
      
    }
  }
  DonatingAppointment.init({
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
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Sets a default value if not provided
    },
  }, {
    sequelize,
    modelName: 'DonatingAppointment',
  });
  return DonatingAppointment;
};