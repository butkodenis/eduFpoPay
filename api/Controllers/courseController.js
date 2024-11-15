const Courses = require('../Models/Courses');
const Departments = require('../Models/Departments');
const { Op } = require('sequelize');

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
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;
      const { courseName } = req.query;

      const whereClause = {};

      // Добавляем условие фильтрации по имени курса, если оно передано
      if (courseName) {
        whereClause.courseName = {
          [Op.iLike]: `%${courseName}%`, // Используем iLike для поиска без учета регистра
        };
      }

      const { rows: courses, count: totalCourses } =
        await Courses.findAndCountAll({
          where: whereClause,
          include: [
            {
              model: Departments,
              as: 'department',
              attributes: ['departmentName'],
            },
          ],
          order: [['courseDateStart', 'ASC']],
          limit,
          offset,
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

      res.status(200).json({
        courses: coursesData,
        currentPage: page,
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;

      const course = await Courses.findByPk(id);

      if (!course) {
        return res.status(404).json({
          message: 'Курс не знайдено',
        });
      }

      await course.destroy();

      res.status(200).json({
        message: `Курс ${course.courseName} успішно видалений`,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const {
        courseType,
        courseName,
        coursePrice,
        coursePoints,
        departmentId,
        courseDateStart,
        courseDateEnd,
      } = req.body;

      const course = await Courses.findByPk(id);

      if (!course) {
        return res.status(404).json({
          message: 'Курс не знайдено',
        });
      }

      await course.update({
        courseType,
        courseName,
        coursePrice,
        coursePoints,
        departmentId,
        courseDateStart,
        courseDateEnd,
      });

      res.status(200).json({
        message: `Курс ${course.courseName} успішно оновлений`,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CourseController();
