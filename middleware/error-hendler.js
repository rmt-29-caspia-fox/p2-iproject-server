const errors = ((err, req, res, next) => {
    let code = 500
    let message = ' Internal server errors'

    res.status(code).json({message})
})

module.exports = errors