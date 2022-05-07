const { Router } = require("express");
const router = Router();
const facultyController = require('../controllers/faculty.controller');


//faculty page
router.get('/', facultyController.faculty_get)

//post selected faculty. renders lecturer page
router.post('/:id', facultyController.faculty_post)

module.exports = router;