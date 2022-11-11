"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Cart.belongsTo(models.User);
			Cart.belongsTo(models.Product);
		}
	}
	Cart.init(
		{
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "User ID is required",
					},
					notNull: {
						msg: "User ID is required",
					},
				},
			},
			ProductId: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Product ID is required",
					},
					notNull: {
						msg: "Product ID is required",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Cart",
		}
	);
	return Cart;
};
