const bcrypt = require('bcrypt');
const saltRound = process.env.roundSalt;

function hash(password) {
    const salt = bcrypt.genSaltSync(saltRound);
    return bcrypt.hashSync(password, salt);
}

function compare(password, hashedpassword) {
    return bcrypt.compareSync(password, hashedpassword);
}

module.exports = { hash, compare }