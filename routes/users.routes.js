const router = require('express').Router();
const usersController = require('../controllers/usersController');


router.get('/list', usersController.getList);
router.get('/:id', usersController.getUser);
router.put('/:id/update', usersController.updateUser);
router.delete('/:id/delete', usersController.deleteUser);

module.exports = router;
