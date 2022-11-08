const errorHandler = (err, req, res, next) =>{
  let code = 500
  let message = "Internal Server Error"
  console.log(err)

  if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError'){
    let errMsg = err.errors.map(el => el.message)
    code = 400
    message = errMsg[0]
  } else if(err.name === 'invalid_login'){
    code = 401
    message = "invalid email or password"
  } else if(err.name === "product_not_found"){
    code = 404
    message = "product not found"
  } else if(err.name === "category_not_found"){
    code = 404
    message = "category not found"
  } else if(err.name === "user_not_found"){
    code = 404
    message = "user not found"
  } else if(err.name === "forbidden"){
    code = 403
    message = "your not authorize"
  } else if(err.name === "invalid_token" ||err.name === "JsonWebTokenError"){
    code = 401
    message = "error authentication - Invalid Token"
  } else if(err.name === "page_not_found"){
    code = 404
    message = "page not Found"
  } else if(err.name === "product_duplicated"){
    code = 400
    message = "product already on your favorite"
  }
  
  res.status(code).json({message})
}

module.exports = errorHandler