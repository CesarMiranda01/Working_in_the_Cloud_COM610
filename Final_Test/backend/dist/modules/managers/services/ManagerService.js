"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ManagerRepository_1 = require("../repositories/ManagerRepository");
class ManagerService {
    async createManager(data) {
        const existingManager = await ManagerRepository_1.default.findByDni(data.dni);
        if (existingManager) {
            throw new Error('Manager with this DNI already exists');
        }
        if (data.age < 18) {
            throw new Error('Manager must be at least 18 years old');
        }
        return ManagerRepository_1.default.create(data);
    }
    async getManager(id) {
        const manager = await ManagerRepository_1.default.findById(id);
        if (!manager) {
            throw new Error('Manager not found');
        }
        return manager;
    }
    async getManagerByDni(dni) {
        return ManagerRepository_1.default.findByDni(dni);
    }
    async updateManager(id, data) {
        const existingManager = await ManagerRepository_1.default.findById(id);
        if (!existingManager) {
            throw new Error('Manager not found');
        }
        if (data.dni && data.dni !== existingManager.dni) {
            const dniExists = await ManagerRepository_1.default.findByDni(data.dni);
            if (dniExists) {
                throw new Error('Another manager with this DNI already exists');
            }
        }
        return ManagerRepository_1.default.update(id, data);
    }
    async deleteManager(id) {
        const manager = await ManagerRepository_1.default.findById(id);
        if (!manager) {
            throw new Error('Manager not found');
        }
        return ManagerRepository_1.default.delete(id);
    }
    async listManagers(filter = {}) {
        return ManagerRepository_1.default.list(filter);
    }
}
exports.default = new ManagerService();
//# sourceMappingURL=ManagerService.js.map