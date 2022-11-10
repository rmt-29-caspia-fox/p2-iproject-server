if (process.env.NODE_ENV !== "production"){
	require("dotenv").config();
}

const express = require('express')

const cors = require('cors')

const router = require('./routes')

const app = express()

const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(router)

app.use((err, req, res, next) => {
	let code = 500
	let message = "Internal server error"

	if(err.name == 'no_email'){
		code = 400
		message = "Email is required"
	}

	if(err.name == 'no_password'){
		code = 400
		message = "Password is required"
	}

	if(err.name == 'no_phone'){
		code = 400
		message = "Phone is required"
	}

	if(err.name == 'invalid_id'){
		code = 400
		message = "Invalid Id"
	}

	if(err.name == 'invalid_otp'){
		code = 401
		message = "Invalid otp"
	}

	if(err.name == 'invalid_email_password'){
		code = 401
		message = "Invalid email/password"
	}

	if(err.name == 'invalid_token'){
		code = 401
		message = "Invalid token"
	}

	if(err.name == 'product_not_found'){
		code = 404
		message = "Product not found"
	}

	if(err.name == 'id_not_found'){
		code = 404
		message = "Id not found"
	}

	if(err.name == 'insufficient_balance'){
		code = 400
		message = "Insufficient balance"
	}

	console.log(err);
	res.status(code).json({message})
})

app.listen(port, () => {
	console.log(`App run on http://localhost:${port}`);
})