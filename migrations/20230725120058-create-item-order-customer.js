'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Item_order_customers', {
      item_order_customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      item_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Items',
          key: 'item_id',
        },
        onDelete: 'CASCADE',
      },
      order_customer_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Order_customers',
          key: 'order_customer_id',
        },
        onDelete: 'CASCADE',
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
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      price: {
        allowNull: false,
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
    await queryInterface.dropTable('Item_order_customers');
  },
};
