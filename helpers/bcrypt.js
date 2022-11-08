const bcrypt = require('bcryptjs')

const hashPass = (password) => {
    return bcrypt.hashSync(password, 8)
}

const comparePass = (password, hashedPass) => {
    return bcrypt.compareSync(password, hashedPass)
}


module.exports = {
    hashPass,
    comparePass
}