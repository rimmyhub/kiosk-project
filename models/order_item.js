'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
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
    }
  }
  Order_item.init(
    {
      order_item: {
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
      amount: {
        allowNull: false,
        type: DataTypes.BIGINT,
        defaultValue: 0,
      },
      state: {
        allowNull: false,
        type: DataTypes.BIGINT,
        defaultValue: 0,
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
      modelName: 'Order_item',
    }
  );
  return Order_item;
};
