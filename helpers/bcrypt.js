const brcypt = require('bcryptjs')

const hashPassword = (password) => {
    return brcypt.hashSync(password,10)
}

const comparingPassword = (password, hashed) => {
    return brcypt.compareSync(password,hashed)
}

module.exports = {
    hashPassword,
    comparingPassword
}