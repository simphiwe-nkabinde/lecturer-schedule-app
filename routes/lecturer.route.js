const { Router } = require("express");
const router = Router();
const lecturerController = require('../controllers/lecturercontroller');


//faculty page
router.get('/:facultyId', lecturerController.faculty_get)

//post selected faculty. renders lecturer page
// router.post('/:id', lecturerController.faculty_post)

module.exports = router;