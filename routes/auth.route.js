const { Router } = require("express");
const router = Router();
const authController = require('../controllers/auth.controller');


//register new user page
router.get('/register', authController.register_get)

//register new user with email & password
router.post('/register', authController.register_post)

//registered user login page
router.get('/login', authController.login_get)

//registered user login
router.post('/login', authController.loginStudent_post)
router.post('/login', authController.loginLecturer_post)

//logout user
router.get('/logout', authController.logout)

module.exports = router;