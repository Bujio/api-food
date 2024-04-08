const router = require('express').Router()
const usersController = require('../controllers/usersController')

router.get("/list", usersController.getList);


module.exports = router;