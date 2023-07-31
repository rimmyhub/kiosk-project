'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item_order_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Item, {
        sourceKey: 'item_id',
        foreignKey: 'item_id',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.Order_customer, {
        sourceKey: 'item_order_customer_id',
        foreignKey: 'item_order_customer_id',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.Option, {
        sourceKey: 'option_id',
        foreignKey: 'option_id',
        onDelete: 'CASCADE',
      });
    }
  }
  Item_order_customer.init(
    {
      item_order_customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      item_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: 'Item',
          key: 'item_id',
        },
      },
      order_customer_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: 'Order_customer',
          key: 'order_customer_id',
        },
      },
      option_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: 'Option',
          key: 'option_id',
        },
      },
      amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      price: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Item_order_customer',
    }
  );
  return Item_order_customer;
};
