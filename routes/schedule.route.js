const { Router } = require("express");
const router = Router();
const scheduleController = require('../controllers/schedule.controller');
const { studentOnly, lecturerOnly, loggedIn } = require("../middleware/auth.middleware");


//schedule page
router.get('/:lecturerId/', loggedIn, scheduleController.schedule_get)

router.get('/edit/:lecturerId', lecturerOnly, scheduleController.schedule_edit_get)

//create new schedule
router.post('/:lecturerId', lecturerOnly, scheduleController.schedule_create)

//update schedule
router.put('/:id', lecturerOnly, scheduleController.schedule_update)

//delete schedule
router.delete('/:lecturerId', lecturerOnly, scheduleController.schedule_delete)

module.exports = router;