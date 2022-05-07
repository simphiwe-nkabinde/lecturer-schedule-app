const { Router } = require("express");
const router = Router();
const facultyController = require('../controllers/faculty.controller');


//faculty page
router.get('/', facultyController.faculty_get)

module.exports = router;