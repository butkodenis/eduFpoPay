const router = require('express').Router();
const courseController = require('../Controllers/courseController');

router.post('/courses/create', courseController.createCourse);
router.get('/courses/all', courseController.getCourses);

module.exports = router;
