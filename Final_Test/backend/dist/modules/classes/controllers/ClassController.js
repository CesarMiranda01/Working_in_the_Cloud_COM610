"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClassService_1 = require("../services/ClassService");
class ClassController {
    async create(req, res) {
        try {
            const classData = req.body;
            const newClass = await ClassService_1.default.createClass(classData);
            res.status(201).json(newClass);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const classItem = await ClassService_1.default.getClass(id);
            if (!classItem) {
                res.status(404).json({ error: 'Class not found' });
                return;
            }
            res.json(classItem);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedClass = await ClassService_1.default.updateClass(id, updateData);
            res.json(updatedClass);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await ClassService_1.default.deleteClass(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async list(req, res) {
        try {
            const { subject, managerId, userId } = req.query;
            const classes = await ClassService_1.default.listClasses({
                subject: subject,
                managerId: managerId,
                userId: userId
            });
            res.json(classes);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getByManager(req, res) {
        try {
            const { managerId } = req.params;
            const classes = await ClassService_1.default.getClassesByManager(managerId);
            res.json(classes);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getByUser(req, res) {
        try {
            const { userId } = req.params;
            const classes = await ClassService_1.default.getClassesByUser(userId);
            res.json(classes);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
const classControllerInstance = new ClassController();
exports.default = classControllerInstance;
//# sourceMappingURL=ClassController.js.map