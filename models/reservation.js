'use strict';
module.exports = (sequelize, DataTypes) => {
  var reservation = sequelize.define('reservation', {
    userId: DataTypes.INTEGER,
    vehicleId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  reservation.associate = function(models) {
    // associations can be defined here
    models.reservation.belongsTo(models.user);
    models.reservation.belongsTo(models.vehicle);
  };
  return reservation;
};