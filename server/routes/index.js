const router = require('express').Router()
const UserController = require('../controllers/userController')
const Validation = require('../middlewares/validation')
router.post('/users', Validation.cekFormat, Validation.cekUniquePhone, Validation.cekUniqueEmail, UserController.create)
router.post('/users/login', UserController.login)

module.exports = router