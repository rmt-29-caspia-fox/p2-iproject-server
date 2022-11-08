'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WaitingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WaitingList.belongsTo(models.Customer)
    }
  }
  WaitingList.init({
    brand: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Brand is required'},
        notEmpty: {msg: 'Brand is required'}
      }
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Name is required'},
        notEmpty: {msg: 'Name is required'}
      }
    },
    status: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'status is required'},
        notEmpty: {msg: 'status is required'}
      }
    },
    licenseNumber: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'licenseNumber is required'},
        notEmpty: {msg: 'licenseNumber is required'}
      }
    },
    service: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'service is required'},
        notEmpty: {msg: 'service is required'}
      }
    },
    CustomerId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'CustomerId is required'},
        notEmpty: {msg: 'CustomerId is required'}
      }
    },
    AdminId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'AdminId is required'},
        notEmpty: {msg: 'AdminId is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'WaitingList',
  });
  return WaitingList;
};