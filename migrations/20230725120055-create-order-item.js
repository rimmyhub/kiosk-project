'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Order_items', {
      order_item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
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
      item_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'Items', // Items 모델을 참조합니다.
          key: 'item_id', // Items 모델의 item_id 참조합니다.
        },
        onDelete: 'CASCADE', // 만약 Items 모델의 item_id 삭제되면, Items 모델의 데이터가 삭제됩니다.
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      state: {
        allowNull: false,
        type: Sequelize.ENUM('Ordered', 'Pending', 'Completed', 'Canceled'),
        defaultValue: 'Ordered',
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
    await queryInterface.dropTable('Order_items');
  },
};
