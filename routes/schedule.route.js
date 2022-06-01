const { Router } = require("express");
const router = Router();
const scheduleController = require('../controllers/schedule.controller');


//schedule page
router.get('/:lecturerId/', scheduleController.schedule_get)

router.get('/edit/:lecturerId', scheduleController.schedule_edit_get)

//create new schedule
router.post('/:lecturerId', scheduleController.schedule_create)

//update schedule
router.put('/:id', scheduleController.schedule_update)

//delete schedule
router.delete('/:lecturerId', scheduleController.schedule_delete)

module.exports = router;