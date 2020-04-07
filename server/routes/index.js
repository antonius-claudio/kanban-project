const router = require('express').Router();
const controllerUser = require('../controllers/controllerUser');
const errorHandler = require('../middlewares/errorHandler');

router.get('/', (req, res, next) => {
    res.status(200).json({message: 'Hello World dari Server'});
})

router.post('/register', controllerUser.register);

router.post('/login', controllerUser.login);

router.post('/googleSignIn', controllerUser.googleSignIn);

router.use(errorHandler);

module.exports = router