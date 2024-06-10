'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BloodCollection extends Model {
    static associate(models) {
      BloodCollection.belongsTo(models.BloodBank, {
        foreignKey: 'bloodBankId',
        as: 'bloodBank',
        onDelete: 'CASCADE'
      })
      BloodCollection.belongsTo(models.Hospital, {
        foreignKey: 'hospitalId',
        as: 'hospital',
        onDelete: 'CASCADE'
      })

    }
  }
  BloodCollection.init({
  group: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensures the group is not empty
    },
  },
  totalQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        min: 0, // Ensures the totalQuantity is a non-negative integer
      },
    },
  },
  bestbefore: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true, // Ensures it is a valid date
      isAfter: new Date().toISOString(), // Ensures the date is not in the past
    },
  },
}, {
  sequelize,
  modelName: 'BloodCollection',
});
  return BloodCollection;
};