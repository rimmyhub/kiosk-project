('use strict');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Owner, {
        sourceKey: 'owner_id',
        foreignKey: 'owner_id',
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.Option, {
        sourceKey: 'option_id',
        foreignKey: 'option_id',
        onDelete: 'CASCADE',
      });

      this.hasOne(models.Order_item, {
        sourceKey: 'item_id',
        foreignKey: 'item_id',
      });

      this.hasMany(models.Item_order_customer, {
        sourceKey: 'item_id',
        foreignKey: 'item_id',
      });
    }
  }
  Item.init(
    {
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      option_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: 'Option',
          key: 'potion_id',
        },
      },
      owner_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: 'Owner',
          key: 'owner_id',
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ['coffee', 'juice', 'food'],
      },
      amount: {
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
      modelName: 'Item',
    }
  );
  return Item;
};
