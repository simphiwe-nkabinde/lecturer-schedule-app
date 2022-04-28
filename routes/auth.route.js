const router = Router();
const { Router } = require("express");
const authController = require('../controllers/auth.controller');


//register new user with email & password
router.post('/register', authController.register)

//registered user login
router.post('/login', authController.login)

//logout user
router.get('/logout', authController.logout)

module.exports = router;