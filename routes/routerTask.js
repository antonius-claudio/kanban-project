const router = require('express').Router();
const controllerTask = require('../controllers/controllerTask');
const authorization = require('../middlewares/authorization');

router.get('/', controllerTask.getAll);

router.post('/', controllerTask.create);

router.put('/:id', authorization, controllerTask.update);

router.delete('/:id', authorization, controllerTask.delete);

module.exports = router