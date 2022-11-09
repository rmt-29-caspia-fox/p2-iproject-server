const express = require("express");
const fs = require("fs");
const { hashPassword, comparePassword } = require("./helpers/bcrypt");
const { encodeToken, decodeToken } = require("./helpers/jwt");
const { User, Product, Cart } = require("./models");
const cors = require("cors");
const app = express();
const port = 3000;

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
		console.log(avatar, "<<<<<<< avatar");
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

// Error Handler
app.use(async (err, req, res, next) => {
	let code = 500;
	let message = "Internal Server Error";

	if (
		err.name === "SequelizeValidationError" ||
		err.name === "SequelizeUniqueConstraintError"
	) {
		code = 400;
		message = err.errors[0].message;
	}

	res.status(code).json({ message: message });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
