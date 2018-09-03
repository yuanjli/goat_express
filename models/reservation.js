'use strict';
module.exports = (sequelize, DataTypes) => {
  var reservation = sequelize.define('reservation', {
    userId: DataTypes.INTEGER,
    vehicleID: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  reservation.associate = function(models) {
    // associations can be defined here
  };
  return reservation;
};