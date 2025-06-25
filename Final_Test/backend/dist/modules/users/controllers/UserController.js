"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../services/UserService");
class UserController {
    async create(req, res) {
        try {
            const userData = req.body;
            const user = await UserService_1.default.createUser(userData);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService_1.default.getUser(id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedUser = await UserService_1.default.updateUser(id, updateData);
            res.json(updatedUser);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await UserService_1.default.deleteUser(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async list(req, res) {
        try {
            const { dni, managerId, name } = req.query;
            const users = await UserService_1.default.listUsers({
                dni: dni,
                managerId: managerId,
                name: name
            });
            res.json(users);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getByManager(req, res) {
        try {
            const { managerId } = req.params;
            const users = await UserService_1.default.getUsersByManager(managerId);
            res.json(users);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new UserController();
//# sourceMappingURL=UserController.js.map