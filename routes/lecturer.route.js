const { Router } = require("express");
const router = Router();
const lecturerController = require('../controllers/lecturer.controller');


//department page
//param: department id
router.get('/:id', lecturerController.lecturer_get)

//post selected faculty. renders lecturer page
// router.post('/:id', lecturerController.faculty_post)

module.exports = router;