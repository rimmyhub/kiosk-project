'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StateTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Order_item, {
        sourceKey: 'order_item_id',
        foreignKey: 'order_item_id',
        onDelete: 'CASCADE',
      });
    }
  }
  StateTransaction.init(
    {
      StateTransactions_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      order_item_id: {
        type: DataTypes.BIGINT,
      },
      beforeState: {
        type: DataTypes.BIGINT,
      },
      afterState: {
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
      modelName: 'StateTransaction',
    }
  );
  return StateTransaction;
};
