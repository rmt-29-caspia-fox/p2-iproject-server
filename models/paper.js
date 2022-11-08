'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paper.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name is required'
        },
        notNull: {
          msg: 'name is required'
        }
      }
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'size is required'
        },
        notNull: {
          msg: 'size is required'
        }
      }
    },
    thickness: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'thickness is required'
        },
        notNull: {
          msg: 'thickness is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description is required'
        },
        notNull: {
          msg: 'description is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'price is required'
        },
        notNull: {
          msg: 'price is required'
        },
        min:{
          args:[1250],
          msg:"Minimum price RP 1.000,00"
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paper',
  });
  Paper.beforeCreate((paper, options) => {
    paper.status = 'ready'
  })
  return Paper;
};