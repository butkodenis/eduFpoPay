const router = require('express').Router();
const departmentController = require('../Controllers/departmentController');

router.get('/departments/all', departmentController.getDepartments);

module.exports = router;