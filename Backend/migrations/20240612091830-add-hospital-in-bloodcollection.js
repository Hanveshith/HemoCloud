'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('BloodCollections', 'hospitalId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Hospitals',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('BloodCollections', {
      fields: ['hospitalId'],
      type: "foreign key",
      references: {
        table: "Hospitals",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('BloodCollections', 'hospitalId');
  }
};
