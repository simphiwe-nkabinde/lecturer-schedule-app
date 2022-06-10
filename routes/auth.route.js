const { Router } = require("express");
const router = Router();
const authController = require('../controllers/auth.controller');
const { adminOnly, loggedIn } = require("../middleware/auth.middleware");


//register new user page
router.get('/register', authController.register_get)

//register new user with email & password
router.post('/register', authController.register_post)

//registered user login page
router.get('/login', authController.login_get)

//admin user login page
router.get('/login/admin', authController.login_get_admin)

//registered user login
router.post('/login', authController.login_post)

//logout user
router.get('/logout', authController.logout)

//get all students - admin only
router.get('/students', loggedIn, authController.getStudents)

//get all lecturers - admin only
router.get('/lecturers', loggedIn, authController.getLecturers)

//remove student or lecturer user
router.delete('/:role/:id', loggedIn, authController.removeUser)

module.exports = router;