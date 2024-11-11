const Courses = require('../Models/Courses');
const Departments = require('../Models/Departments');

class CourseController {
  async createCourse(req, res) {
    try {
      const {
        courseType,
        courseName,
        coursePrice,
        coursePoints,
        departmentId,
        courseDateStart,
        courseDateEnd,
      } = req.body;

      // Перевірка на унікальність курсу
      const existingCourse = await Courses.findOne({
        where: {
          courseName,
          courseType,
          departmentId,
          coursePrice,
        },
      });

      if (existingCourse) {
        return res.status(400).json({
          message: 'Курс з таким іменем вже існує',
        });
      }

      await Courses.create({
        courseType,
        courseName,
        coursePrice,
        coursePoints,
        departmentId,
        courseDateStart,
        courseDateEnd,
      });

      res.status(201).json({
        message: `Курс : ${courseName}, успішно створений`,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async getCourses(req, res) {
    try {
      const courses = await Courses.findAll({
        include: [
          {
            model: Departments,
            as: 'department',
            attributes: ['departmentName'],
          },
        ],
      });

      const coursesData = courses.map((course) => {
        return {
          id: course.id,
          courseType: course.courseType,
          courseName: course.courseName,
          coursePrice: course.coursePrice,
          coursePoints: course.coursePoints,
          department: course.department.departmentName,
          courseDateStart: course.courseDateStart,
          courseDateEnd: course.courseDateEnd,
        };
      });

      res.status(200).json({ courses: coursesData });
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

module.exports = new CourseController();
