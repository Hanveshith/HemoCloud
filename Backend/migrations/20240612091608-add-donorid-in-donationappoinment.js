'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('DonatingAppointments', 'donorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Donors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('DonatingAppointments', {
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
    await queryInterface.removeColumn('DonatingAppointments', 'donorId');
  }
};
