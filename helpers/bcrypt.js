const bcrypt = require('bcryptjs');

const hashPass = (pass) => {
    return bcrypt.hashSync(pass, 8)
}

const comparePass = (pass, hash) => {
    return bcrypt.compareSync(pass, hash)
}

module.exports = {hashPass, comparePass}