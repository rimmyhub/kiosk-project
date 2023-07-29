'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefreshToken.init(
    {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      owner_id: {
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      timestamps: false,
    }
  );
  return RefreshToken;
};
