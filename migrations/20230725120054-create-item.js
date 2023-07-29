'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      option_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Options',
          key: 'option_id',
        },
        onDelete: 'CASCADE',
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Owners',
          key: 'owner_id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        // values: Object.values(itemType),
        values: ['coffee', 'juice', 'food'],
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  },
};
