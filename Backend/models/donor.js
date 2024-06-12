'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donor extends Model {
    static associate(models) {
      Donor.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      })
      Donor.belongsTo(models.BloodBank, {
        foreignKey: 'bloodBankId',
        as: 'bloodBank',
        onDelete: 'CASCADE'
      })
      Donor.hasMany(models.Donation, {
        foreignKey: 'donorId',
        as: 'donations',
        onDelete: 'CASCADE'
      })
      Donor.hasMany(models.DonatingAppointment, {
        foreignKey: 'donorId',
        as: 'donatingAppointments',
        onDelete: 'CASCADE'
      })

    }
  }
  Donor.init({
    priveousDonation_date: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true, // Ensures it is a valid date
        isBefore: new Date().toISOString(), // Ensures the date is before today
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Set default value to false if not provided
    },
  }, {
    sequelize,
    modelName: 'Donor',
  });
  return Donor;
};