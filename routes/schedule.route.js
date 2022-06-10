const { Router } = require("express");
const router = Router();
const scheduleController = require('../controllers/schedule.controller');
const { studentOnly, lecturerOnly, loggedIn, lecturerAdminOnly } = require("../middleware/auth.middleware");


//schedule page
router.get('/:lecturerId/', loggedIn, scheduleController.schedule_get)

router.get('/edit/:lecturerId', lecturerAdminOnly, scheduleController.schedule_edit_get)

//create new schedule
router.post('/:lecturerId', lecturerAdminOnly, scheduleController.schedule_create)

//update schedule
router.put('/:id', lecturerAdminOnly, scheduleController.schedule_update)

//delete schedule
router.delete('/:lecturerId', lecturerAdminOnly, scheduleController.schedule_delete)

module.exports = router;