const router = require('express').Router();
const studentController = require('../Controllers/studentController');

router.post('/students/create', studentController.createStudent);
router.get('/students/all', studentController.getStudents);
