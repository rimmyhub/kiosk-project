'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Item, {
        sourceKey: 'option_id',
        foreignKey: 'option_id',
      });

      this.belongsTo(models.Owner, {
        sourceKey: 'owner_id',
        foreignKey: 'owner_id',
      });

      this.hasMany(models.Item_order_customer, {
        sourceKey: 'option_id',
        foreignKey: 'option_id',
      });
    }
  }
  Option.init(
    {
      option_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      owner_id: {
        allowNull: false,
        type: DataTypes.BIGINT,
        references: {
          model: 'Owner',
          key: 'owner_id',
        },
      },
      extra_price: {
        allowNull: true,
        type: DataTypes.BIGINT,
      },
      shot_price: {
        allowNull: true,
        type: DataTypes.BIGINT,
      },
      hot: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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
      modelName: 'Option',
    }
  );
  return Option;
};
