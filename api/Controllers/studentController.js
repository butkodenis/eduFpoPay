const Students = require('../Models/studentModel');

class StudentController {
  async createStudent(req, res) {
    try {
      const {
        firstName,
        lastName,
        middleName,
        phone,
        passportSeries,
        passportDate,
      } = req.body;
      const existingStudent = await Students.findOne({
        where: {
          firstName,
          lastName,
          middleName,
          passportSeries,
        },
      });
      if (existingStudent) {
        return res.status(400).json({
          message: 'Студент з такими даними вже існує',
        });
      }
      await Student.create({
        firstName,
        lastName,
        middleName,
        phone,
        passportSeries,
        passportDate,
      });
      res.status(201).json({
        message: `Студент : ${firstName} ${lastName}, успішно створений`,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }
  async getStudents(req, res) {
    try {
      const students = await Students.findAll();
      console.log('students', students);
      if (!students) {
        return res.status(400).json({
          message: 'Студентів не знайдено',
        });
      }

      res.status(200).json(students);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new StudentController();
