const express = require('express')
const authController = require('../controllers/auth.controller')
const middleware = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/logged-user', middleware.loginAuthenticate, authController.getLoggedUser)

module.exports = router