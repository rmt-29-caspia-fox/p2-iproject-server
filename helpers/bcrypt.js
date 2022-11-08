const bcrypt = require('bcryptjs')

const hashPassword = (pass) => {
    return bcrypt.hashSync(pass, 10)
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    comparePassword,
}