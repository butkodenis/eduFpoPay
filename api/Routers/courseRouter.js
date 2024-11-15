const router = require('express').Router();
const courseController = require('../Controllers/courseController');

router.post('/courses/create', courseController.createCourse);
router.get('/courses/all', courseController.getCourses);
router.delete('/courses/delete/:id', courseController.deleteCourse);
router.put('/courses/update/:id', courseController.updateCourse);

module.exports = router;
