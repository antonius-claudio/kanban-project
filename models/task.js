'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The task is required!'
        },
        notNull: {
          msg: 'The task is required!'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The category is required!'
        },
        notNull: {
          msg: 'The category is required!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  });
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User);
  };
  return Task;
};