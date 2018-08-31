'use strict';
module.exports = (sequelize, DataTypes) => {
  var cars = sequelize.define('cars', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    NumSeat: DataTypes.INTEGER
  }, {});
  cars.associate = function(models) {
    // associations can be defined here
  };
  return cars;
};