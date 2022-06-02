const { Router } = require("express");
const router = Router();
const lecturerController = require('../controllers/lecturer.controller');
const {studentOnly} = require("../middleware/auth.middleware");


//department page
//param: department id
router.get('/', studentOnly, lecturerController.lecturer_get)

module.exports = router;