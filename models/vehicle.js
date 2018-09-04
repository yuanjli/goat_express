'use strict';
module.exports = (sequelize, DataTypes) => {
  var vehicle = sequelize.define('vehicle', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    numSeats: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  vehicle.associate = function(models) {
    // associations can be defined here
    models.vehicle.belongsTo(models.user);
    models.vehicle.hasMany(models.reservation);
  };
  return vehicle;
};