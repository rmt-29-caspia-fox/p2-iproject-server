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

		const access_token = encodeToken({ id: user.id });

		res.status(200).json({ access_token });
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
	} else if (err.name === "Email is required") {
		code = 400;
		message = "Email is required";
	} else if (err.name === "Password is required") {
		code = 400;
		message = "Password is required";
	} else if (err.name === "Invalid email/password") {
		code = 401;
		message = "Invalid email/password";
	}

	res.status(code).json({ message: message });
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
