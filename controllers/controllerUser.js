const { User } = require('../models');
const { sign } = require('../helpers/jwt');
const { compare } = require('../helpers/bcrypt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.client_id_oauth_google);

class controllerUser {
    static register (req, res, next) {
        let form = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: form.email
            }
        })
        .then((result) => {
            if (result) {
                throw {msg: 'Email already registered!'}
            } else {
                return User.create(form);
            }
        })
        .then((result) => {
            let access_token = sign({
                UserId: result.id,
                UserEmail: result.email,
                UserOrganization: result.organization
            });
            res.status(201).json({access_token, id:result.id, name:result.name});
        })
        .catch((err) => {
            next(err);
        });
    }

    static login (req, res, next) {
        let form = {
            email: req.body.email,
            password: req.body.password
        }
        let errors = [];
        if (form.email === '' || form.email === null) {
            errors.push({message: 'The email is required!'});
        }
        if (form.password === '' || form.password === null) {
            errors.push({message: 'The password is required!'});
        }
        if (errors.length !== 0) {
            throw {errors};
        } else {
            User.findOne({
                where: {
                    email: form.email
                }
            })
            .then((result) => {
                if (result) {
                    let isPassValid = compare(form.password, result.password);
                    if (isPassValid) {
                        let access_token = sign({
                            UserId: result.id,
                            UserEmail: result.email,
                            UserOrganization: result.organization
                        });
                        res.status(200).json({access_token, id:result.id, name:result.name});
                    } else {
                        throw {msg: 'Wrong Password!', status:401};
                    }
                } else {
                    throw {msg: 'Email not found!'};
                }
            })
            .catch((err) => {
                next(err);
            });
        }
    }

    static googleSignIn(req, res, next) {
        let idToken = req.body.idToken;
        let newUser = {};
        client.verifyIdToken({
            idToken,
            audience: process.env.client_id_oauth_google
        })
        .then((result) => {
            const payload = result.getPayload();
            newUser.name = payload.name;
            newUser.email = payload.email;

            // cek email di db
            return User.findOne({
                where: {
                    email: newUser.email
                }
            })
        })
        .then((result) => {
            if (result) {
                let access_token = sign({
                    UserId: result.id,
                    UserEmail: result.email,
                    UserOrganization: result.organization
                });
                res.status(200).json({access_token, id:result.id, name:result.name});
            } else {
                newUser.password = '1234';
                return User.create(newUser)
            }
        })
        .then((result) => {
            let access_token = sign({
                UserId: result.id,
                UserEmail: result.email,
                UserOrganization: result.organization
            });
            res.status(201).json({access_token, id:result.dataValues.id, name:result.dataValues.name});

        })
        .catch((err) => {
            next(err);
        });
    }
}

module.exports = controllerUser