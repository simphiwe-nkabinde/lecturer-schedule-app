const { Router } = require("express");
const router = Router();
const departmentController = require('../controllers/department.controller');


//department page
//param: faculty id
router.get('/:id', departmentController.department_get)

module.exports = router;