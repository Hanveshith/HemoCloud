'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    static associate(models) {
      Request.belongsTo(models.Hospital, {
        foreignKey: 'hospitalId',
        as: 'hospital',
        onDelete: 'CASCADE'
      })
      Request.belongsTo(models.BloodBank, {
        foreignKey: 'bloodBankId',
        as: 'bloodBank',
        onDelete: 'CASCADE'
      })
      Request.belongsTo(models.User , {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      })
    }
  }
  Request.init({
    group: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures the group is not empty
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true, // Ensures it is a valid date
        isAfter: new Date().toISOString(), // Ensures the date is not in the past
      },
    },
    currLocation_Lat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isFloat: true, // Ensures it is a valid float value
      },
    },
    currLocation_Long: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isFloat: true,
      },
    },
    Hospital: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Sets a default value if not provided
    },
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};