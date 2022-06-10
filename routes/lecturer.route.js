const { Router } = require("express");
const router = Router();
const lecturerController = require('../controllers/lecturer.controller');
const {studentOnly, adminOnly} = require("../middleware/auth.middleware");


//department page
//param: department id
router.get('/', studentOnly, lecturerController.lecturer_get);

//admin
router.get('/admin', adminOnly, lecturerController.lecturer_get_admin);

module.exports = router;