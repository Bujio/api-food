const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/list', usersController.getList);
router.post('/create', usersController.createUser);

module.exports = router;
