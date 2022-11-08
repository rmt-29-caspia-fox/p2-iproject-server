
function errorHandler(error,req,res,next){
  const code = 500;
  const msg = "Internal Server Error";

  res.status(code).json({message:msg})
}

module.exports = errorHandler