'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  });
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};