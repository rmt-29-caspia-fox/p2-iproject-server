"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasMany(models.Cart);
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "First Name is required",
					},
					notNull: {
						msg: "First Name is required",
					},
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Last Name is required",
					},
					notNull: {
						msg: "Last Name is required",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "Email must be unique",
				},
				validate: {
					notEmpty: {
						msg: "Email is required",
					},
					notNull: {
						msg: "Email is required",
					},
					isEmail: {
						msg: "Invalid email format",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Password is required",
					},
					notNull: {
						msg: "Password is required",
					},
					len: {
						args: [6, 200],
						msg: "Password minimum 6 characters",
					},
				},
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Phone Number is required",
					},
					notNull: {
						msg: "Phone Number is required",
					},
				},
			},
			avatar: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	User.beforeCreate((user, option) => {
		user.password = hashPassword(user.password);
	});

	return User;
};
