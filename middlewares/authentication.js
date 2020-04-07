const { verify } = require('../helpers/jwt');
function authentication(req, res, next) {
    let access_token = req.headers.access_token;
    if (access_token) {
        let decoded = verify(req.headers.access_token);
        req.UserId = decoded.UserId;
        req.UserEmail = decoded.UserEmail;
        next();
    } else {
        throw {msg: `Don't have access`, status: 403};
    }
}

module.exports = authentication