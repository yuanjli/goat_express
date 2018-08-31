'use strict';
module.exports = (sequelize, DataTypes) => {
  var reservation = sequelize.define('reservation', {
    userId: DataTypes.INTEGER,
    carId: DataTypes.INTEGER,
    startDate: DataTypes.INTEGER,
    endDate: DataTypes.INTEGER
  }, {});
  reservation.associate = function(models) {
    // associations can be defined here
  };
  return reservation;
};