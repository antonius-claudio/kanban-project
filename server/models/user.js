'use strict';
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The name is required!'
        },
        notEmpty: {
          msg: 'The name is required!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The email is required!'
        },
        notEmpty: {
          msg: 'The email is required!'
        },
        isEmail: {
          msg: 'The email must be in email format!'
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'The password is required!'
        },
        notEmpty: 'The password is required!'
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (models, option) => {
        models.password = hash(models.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task);
  };
  return User;
};