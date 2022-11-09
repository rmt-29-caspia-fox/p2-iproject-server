const errors = ((err, req, res, next) => {
    console.log(err);
    let code = 500
    let message = ' Internal server errors'

    res.status(code).json({message})
})

module.exports = errors