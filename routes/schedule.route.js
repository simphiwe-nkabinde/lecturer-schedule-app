const { Router } = require("express");
const router = Router();
const scheduleController = require('../controllers/schedule.controller');


//schedule page
router.get('/:lecturerId/:departmentId', scheduleController.schedule_get)

//create new schedule
router.post('/', scheduleController.schedule_create)

//update schedule
router.put('/:id', scheduleController.schedule_update)

module.exports = router;