'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Donations', 'bloodBankId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'BloodBanks',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('Donations', {
      fields: ['bloodBankId'],
      type: "foreign key",
      references: {
        table: "BloodBanks",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Donations', 'bloodBankId');
  }
};
