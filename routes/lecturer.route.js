const { Router } = require("express");
const router = Router();
const lecturerController = require('../controllers/lecturer.controller');


//department page
//param: department id
router.get('/', lecturerController.lecturer_get)

module.exports = router;