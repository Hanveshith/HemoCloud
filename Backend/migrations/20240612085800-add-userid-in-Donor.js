'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Donors', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });



    await queryInterface.addConstraint('Donors', {
      fields: ['userId'],
      type: "foreign key",
      references: {
        table: "Users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Donors', 'userId');
    // await queryInterface.removeColumn('Donors', 'bloodBankId');
  }
};
