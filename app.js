if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
// const axios = require("axios");
const midtransClient = require("midtrans-client");
const fs = require("fs");
const { hashPassword, comparePassword } = require("./helpers/bcrypt");
const { encodeToken, decodeToken } = require("./helpers/jwt");
const { User, Product, Cart } = require("./models");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// function base64_encode(file) {
// 	let bitmap = fs.readFileSync(file);
// 	return new Buffer(bitmap).toString("base64");
// }

app.post("/register", async (req, res, next) => {
	try {
		const { firstName, lastName, email, password, phoneNumber } = req.body;
		const avatar = fs.readFileSync("./asset/avatar-default.png", "base64");
		// let avatar = base64_encode("./asset/avatar-default.png");
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
			phoneNumber,
			avatar,
		});
		res.status(201).json({ id: user.id, email: user.email });
	} catch (err) {
		next(err);
	}
});

app.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email) {
			throw { name: "Email is required" };
		}
		if (!password) {
			throw { name: "Password is required" };
		}

		const user = await User.findOne({ where: { email: email } });
		if (!user) {
			throw { name: "Invalid email/password" };
		}

		const validation = comparePassword(password, user.password);
		if (!validation) {
			throw { name: "Invalid email/password" };
		}
		const access_token = encodeToken({
			id: user.id,
		});
		res.status(200).json({
			access_token: access_token,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			avatar: user.avatar,
		});
	} catch (err) {
		next(err);
	}
});

app.post("/google-sign-in", async (req, res, next) => {
	try {
		const CLIENT_ID =
			"59509847986-2d6leab7etkccbsmeog4v9cq2l94t7hl.apps.googleusercontent.com";
		const { google_token } = req.headers;
		const client = new OAuth2Client(CLIENT_ID);
		const ticket = await client.verifyIdToken({
			idToken: google_token,
			audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
			// Or, if multiple clients access the backend:
			//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
		});
		const payload = ticket.getPayload();
		console.log("<<<<<<< PAYLOAD", payload);
		// Untuk user yang login dengan Google, kita perlu cek, apakah si user sudah terdaftar di database atau belum dengan informasi yang ada di payload. --- contoh payload.email
		// Jika user belum terdaftar, maka Create User
		// Jika user sudah terdaftar, maka Generate access_token untuk login
		const avatar = fs.readFileSync("./asset/avatar-default.png", "base64");
		const [user, created] = await User.findOrCreate({
			where: { email: payload.email },
			defaults: {
				firstName: payload.given_name,
				lastName: payload.family_name,
				email: payload.email,
				password: payload.name + "_google",
				phoneNumber: "999",
				avatar: avatar,
			},
			hooks: false,
		});
		const access_token = encodeToken({
			id: user.id,
		});

		res.status(200).json({
			access_token: access_token,
			firstName: payload.given_name,
			lastName: payload.family_name,
			email: payload.email,
			avatar: avatar,
		});
	} catch (err) {
		next(err);
	}
});

app.get("/products", async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.status(200).json(products);
	} catch (err) {
		next(err);
	}
});

// Authentication
app.use(async (req, res, next) => {
	try {
		const { access_token } = req.headers;
		const payload = decodeToken(access_token);
		if (!payload) {
			throw { name: "Invalid token" };
		}

		const user = await User.findByPk(payload.id);
		if (!user) {
			throw { name: "Invalid token" };
		}

		req.user = { id: user.id };

		next();
	} catch (err) {
		next(err);
	}
});

app.post("/carts/:ProductId", async (req, res, next) => {
	try {
		const UserId = req.user.id;
		const ProductId = req.params.ProductId;
		const product = await Product.findByPk(ProductId);
		if (!product) {
			throw { name: "Product not found" };
		}
		const [cart, created] = await Cart.findOrCreate({
			where: { UserId: UserId, ProductId: ProductId },
			defaults: {
				UserId: UserId,
				ProductId: ProductId,
			},
		});
		if (created) {
			res.status(201).json(cart);
		} else {
			res.status(409).json({ message: "Product has been added to cart" });
		}
	} catch (err) {
		next(err);
	}
});

app.get("/carts", async (req, res, next) => {
	try {
		const UserId = req.user.id;
		const carts = await Cart.findAll({
			include: { model: Product },
			where: { UserId: UserId },
			order: [["id", "ASC"]],
		});
		if (carts.length < 1) {
			res.status(409).json({ message: "Cart still empty" });
		} else {
			res.status(200).json(carts);
		}
	} catch (err) {
		next(err);
	}
});

// Authorization
const authorization = async (req, res, next) => {
	try {
		const { id } = req.params;
		const UserId = req.user.id;
		const cart = await Cart.findByPk(id);
		if (!cart) {
			throw { name: "Product not found" };
		}
		if (UserId !== cart.UserId) {
			throw { name: "You are not authorized" };
		}
		next();
	} catch (err) {
		next(err);
	}
};

app.delete("/carts/:id", authorization, async (req, res, next) => {
	try {
		const id = req.params.id;
		const cart = await Cart.findByPk(id);
		if (!cart) {
			throw { name: "Product not found" };
		}
		await Cart.destroy({
			where: { id: id },
		});
		res.status(200).json({ message: "Product has been removed from cart" });
	} catch (err) {
		next(err);
	}
});

app.post("/midtrans-transaction-token", async (req, res, next) => {
	try {
		let snap = new midtransClient.Snap({
			// Set to true if you want Production Environment (accept real transaction).
			isProduction: false,
			serverKey: process.env.MIDTRANS_SERVER_KEY,
		});

		const order_id = "TRANS_" + new Date().getTime();
		let parameter = {
			transaction_details: {
				order_id: order_id, // isi order_id dengan value yang unique untuk tiap transaction
				gross_amount: req.body.price, // harga total transaction (jika untuk keperluan bayar beberapa item maka tinggal di total harga2 nya)
			},
			credit_card: {
				secure: true,
			},
			customer_details: {
				first_name: req.body.firstName,
				last_name: req.body.lastName,
				// email: "budi@mail.com",
				// phone: "08111222333",
			},
		};

		const transaction = await snap.createTransaction(parameter);

		res.status(201).json({ transaction });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// Error Handler
app.use(async (err, req, res, next) => {
	let code = 500;
	let message = "Internal Server Error";
	console.log(err);
	if (
		err.name === "SequelizeValidationError" ||
		err.name === "SequelizeUniqueConstraintError"
	) {
		code = 400;
		message = err.errors[0].message;
	} else if (err.name === "Email is required") {
		code = 400;
		message = "Email is required";
	} else if (err.name === "Password is required") {
		code = 400;
		message = "Password is required";
	} else if (err.name === "Invalid email/password") {
		code = 401;
		message = "Invalid email/password";
	} else if (err.name === "Invalid token" || err.name === "JsonWebTokenError") {
		code = 401;
		message = "Invalid token";
	} else if (err.name === "Product not found") {
		code = 404;
		message = "Product not found";
	} else if (err.name === "You are not authorized") {
		code = 403;
		message = "You are not authorized";
	} else if (err.name === "MidtransError") {
		code = err.httpStatusCode;
		message = err.ApiResponse.error_messages[0];
	}

	res.status(code).json({ message: message });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
