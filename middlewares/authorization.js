const { Task } = require('../models');
function authorization(req, res, next) {
    let idTask = req.params.id;
    Task.findByPk(idTask)
    .then((result) => {
        if (result) {
            if (result.UserId === req.UserId) {
                next();
            } else {
                throw {msg: `Not Authorized!`, status: 401};
            }
        } else {
            throw {msg: `Task not found`};
        }
    })
    .catch((err) => {
        next(err);
    });
}

module.exports = authorization