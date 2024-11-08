const Departments = require('../Models/Departments');

class DepartmentController {
    async getDepartments(req, res) {
        try {
            const departments = await Departments.findAll();
            res.status(200).json({ departments });
        } catch (e) {
            res.status(400).json(e);
        }
    }

}

module.exports = new DepartmentController();
