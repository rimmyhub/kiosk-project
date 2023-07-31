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
      Item_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Items', // Items 모델을 참조합니다.
          key: 'item_id', // Items 모델의 item_id 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Items 모델의 item_id 삭제되면, Items 모델의 데이터가 삭제됩니다.
      },
      Order_customer_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Order_customers', // order_customers 모델을 참조합니다.
          key: 'order_customer_id', // order_customers 모델의 order_customer_id 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Items 모델의 order_customer_id 삭제되면, order_customers 모델의 데이터가 삭제됩니다.
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      option: {
        allowNull: false,
        type: Sequelize.JSON,
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
