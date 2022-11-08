'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CandidateStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CandidateStudent.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'First name is require' },
          notEmpty: { msg: 'First name is required' },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Last name is require' },
          notEmpty: { msg: 'Last name is required' },
        },
      },
      ageOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Age of birth is require' },
          notEmpty: { msg: 'Age of birth is required' },
        },
      },
      lastEducation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Last education is require' },
          notEmpty: { msg: 'Last education is required' },
        },
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Photo is require' },
          notEmpty: { msg: 'Photo is required' },
        },
      },
      parentName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Parent name is require' },
          notEmpty: { msg: 'Parent name is required' },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Address is require' },
          notEmpty: { msg: 'Address is required' },
        },
      },
      schoolName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'School name is require' },
          notEmpty: { msg: 'School name is required' },
        },
      },
      FormalEducationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CandidateStudent',
    }
  );
  return CandidateStudent;
};
