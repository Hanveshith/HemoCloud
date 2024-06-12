'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Donor, {
        foreignKey: 'userId',
        as: 'donor',
        onDelete: 'CASCADE'
      })

      User.hasMany(models.Request, {
        foreignKey: 'userId',
        as: 'requests',
        onDelete: 'CASCADE'
      })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures the string is not empty
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sex: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        isIn: [['M', 'F', 'O']], // Ensures the value is one of 'M', 'F', 'O'
      },
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']], // Validates blood group
      },
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true, // Ensures it is a valid date
        isBefore: new Date().toISOString(), // Ensures the date is before today
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true, // Ensures it is a valid URL
      },
    },
    validProofURL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures it is a valid email
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 128], // Ensures password length is between 8 and 128 characters
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['admin', 'donor', 'receiver']], // Ensures the role is either 'admin' or 'user'
      },
    },
    donorStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};