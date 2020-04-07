const { Task, User } = require('../models');

class controllerTask {

    static getAll(req, res, next) {
        let UserId = req.UserId;
        let organization = null;
        User.findByPk(UserId)
        .then((result) => {
            organization = result.organization;
            return Task.findAll({
                        include: [
                            {
                                model: User,
                                where: {
                                    organization
                                }
                            }
                        ]
                    })
        })
        .then((result) => {
            let temp = [];
            result.forEach(i => {
                let obj = {
                    id: i.id,
                    title: i.title,
                    category: i.category,
                    UserId: i.UserId,
                    organization: i.organization,
                    createdAt: i.createdAt
                };
                if (i.User.id === UserId) {
                    obj.isOwner = true;
                } else {
                    obj.isOwner = false;
                }
                temp.push(obj);
            })
            res.status(200).json(temp);
        })
        .catch((err) => {
            next(err);
        });
    }

    static create(req, res, next) {
        let form = {
            title: req.body.title,
            UserId: req.UserId,
            category: req.body.category
        }
        Task.create(form)
        .then((result) => {
            let data = {
                id: result.id,
                title: result.title,
                category: result.category,
                createdAt: result.createdAt,
                UserId: result.UserId
            }
            res.status(201).json(data);
        })
        .catch((err) => {
            next(err);
        });
    }

    static update(req, res, next) {
        let idTask = req.params.id;
        let form = {
            title: req.body.title,
            category: req.body.category
        };
        let errors = [];
        if (form.title === '') {
            errors.push({message: 'The title is required!'});
        }
        if (form.category === '') {
            errors.push({message: 'The category is required!'});
        }
        if (errors.length !== 0) {
            throw {errors};
        } else {
            Task.update(form, {
                where: {
                    id: idTask
                }
            })
            .then((result) => {
                res.status(200).json(form);
            })
            .catch((err) => {
                next(err);
            });
        }
    }

    static delete(req, res, next) {
        let idTask = req.params.id;
        Task.destroy({
            where: {
                id: idTask
            }
        })
        .then((result) => {
            res.status(200).json({message: 'Deleted successfully!'});
        })
        .catch((err) => {
            next(err);
        });
    }

}

module.exports = controllerTask