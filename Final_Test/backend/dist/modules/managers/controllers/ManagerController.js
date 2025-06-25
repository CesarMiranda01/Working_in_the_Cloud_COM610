"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ManagerService_1 = require("../services/ManagerService");
class ManagerController {
    async create(req, res) {
        try {
            const managerData = req.body;
            const manager = await ManagerService_1.default.createManager(managerData);
            res.status(201).json(manager);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const manager = await ManagerService_1.default.getManager(id);
            if (!manager) {
                res.status(404).json({ error: 'Manager not found' });
                return;
            }
            res.json(manager);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getByDni(req, res) {
        try {
            const { dni } = req.params;
            const manager = await ManagerService_1.default.getManagerByDni(dni);
            if (!manager) {
                res.status(404).json({ error: 'Manager not found' });
                return;
            }
            res.json(manager);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedManager = await ManagerService_1.default.updateManager(id, updateData);
            res.json(updatedManager);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await ManagerService_1.default.deleteManager(id);
            res.status(204).send();
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async list(req, res) {
        try {
            const { dni, name, minAge, maxAge } = req.query;
            const managers = await ManagerService_1.default.listManagers({
                dni: dni,
                name: name,
                minAge: minAge ? parseInt(minAge) : undefined,
                maxAge: maxAge ? parseInt(maxAge) : undefined
            });
            res.json(managers);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
exports.default = new ManagerController();
//# sourceMappingURL=ManagerController.js.map