'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    content: DataTypes.STRING,
    vehicleId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    models.reservation.belongsTo(models.user);
    models.reservation.belongsTo(models.vehicle);
  };
  return comment;
};