const errorHandler = (err,req,res,next) => {
	let code = 500
	let message = `Internal Server Error`

	console.log(err, `<<< ini error`);
	
	if (err.name === 'invalid_token' || err.name === 'JsonWebTokenError'){
			code = 401
			message = `Invalid Token`
		} else if (err.name === 'InvalidLogin') {
			code = 401
			message = `Invalid Email/Password`
		} else if (err.name === 'forbidden'){
			code = 403
			message = `Forbidden`
		} else if (err.name === "SequelizeValidationError"){
			code = 400
			message = err.errors[0].message
		}	else if (err.name === "UserEmailRegistered"){
			code = 400	
			message = `Email is already used`
		} 
		
	res.status(code).json({ message })
}


module.exports = errorHandler