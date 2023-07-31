'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StateTransactions', {
      StateTransactions_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_item_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Order_items',
          key: 'order_item_id',
        },
        onDelete: 'CASCADE',
      },
      beforeState: {
        type: Sequelize.BIGINT,
      },
      afterState: {
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable('StateTransactions');
  },
};
