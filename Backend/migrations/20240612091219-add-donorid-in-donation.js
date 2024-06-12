'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Donations', 'donorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Donors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('Donations', {
      fields: ['donorId'],
      type: "foreign key",
      references: {
        table: "Donors",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Donations', 'donorId');
  }
};
