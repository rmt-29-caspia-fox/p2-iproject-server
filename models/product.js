"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.hasMany(models.Cart);
		}
	}
	Product.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Name is required",
					},
					notNull: {
						msg: "Name is required",
					},
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Description is required",
					},
					notNull: {
						msg: "Description is required",
					},
				},
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Quantity is required",
					},
					notNull: {
						msg: "Quantity is required",
					},
					min: {
						args: 1,
						msg: "Quantity minimum 1",
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Price is required",
					},
					notNull: {
						msg: "Price is required",
					},
					min: {
						args: 9999,
						msg: "Price minimum Rp9.999,00",
					},
				},
			},
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Image URL is required",
					},
					notNull: {
						msg: "Image URL is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Product",
		}
	);
	return Product;
};
