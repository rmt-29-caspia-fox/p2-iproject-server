function errorHandler(err, req, res, next) {
    let code = 500;
    let message = "Internal Server Error"
    let error = err;
    if (err.message == "Invalid Login") {
        error = err.message;
        code = 400;
        message = "Username / Password is Invalid";
    } else if (err.name == "SequelizeValidationError") {
        const errMsg = err.errors[0].message
        code = 400;
        message = "Field(s) is invalid";
        error = errMsg;
    } else if (err.message.includes("Not Found")) {
        code = 404;
        message = "404 Not Found";
        error = err.message;
    } else if (err.message == "Invalid Token" || err.name == "JsonWebTokenError") {
        error = err.message;
        code = 401;
        message = err.message;
    } else if (err.message == "Forbidden") {
        code = 403;
        error = err.message;
        message = "Unauthorized Access";
    } else if (err.message == "Customer Only") {
        code = 403;
        error = err.message;
        message = "Use different Account";
    } else if (err.name == "SequelizeUniqueConstraintError" || err.message == "This movie is already bookmarked") {
        code = 409;
        error = err.message;
        message = "Conflict with database";
    } else if (err.message = "Not Enough Card") {
        code = 400;
        message = err.message;
        error = "Card must have minimum of 40 Cards"
    }
    res.status(code).json({ message: `${message}`, error: error })
}

module.exports = errorHandler;