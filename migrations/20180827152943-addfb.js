'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Add column facebookId and facebookToken to the users table
    return queryInterface.addColumn('users', 'facebookId', Sequelize.STRING).then(function(){
      return queryInterface.addColumn('users', 'facebookToken', Sequelize.STRING);
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    // Remove columns facebookId and facebookToken from the users table
    return queryInterface.removeColumn('users', 'facebookId').then(function(){
      return queryInterface.removeColumn('users', 'facebookToken');
    });

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
