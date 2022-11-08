const hashCode = require('bcryptjs')

const encode = (password) => {
    return hashCode.hashSync(password, 9)
}

const decode = (password, hashPassword) => {
    return hashCode.compareSync(password, hashPassword)
}

module.exports = { encode, decode }