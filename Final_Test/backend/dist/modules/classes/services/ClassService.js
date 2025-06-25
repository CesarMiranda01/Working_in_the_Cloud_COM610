"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClassRepository_1 = require("../repositories/ClassRepository");
const ManagerService_1 = require("../../managers/services/ManagerService");
const UserService_1 = require("../../users/services/UserService");
class ClassService {
    async createClass(data) {
        const manager = await ManagerService_1.default.getManager(data.managerId);
        if (!manager) {
            throw new Error('Manager not found');
        }
        const user = await UserService_1.default.getUser(data.userId);
        if (!user) {
            throw new Error('User not found');
        }
        return ClassRepository_1.default.create({
            subject: data.subject,
            managerId: manager.id,
            managerName: manager.name,
            managerDni: manager.dni,
            userId: user.id,
            userName: user.name,
            userDni: user.dni
        });
    }
    async getClass(id) {
        return ClassRepository_1.default.findById(id);
    }
    async updateClass(id, data) {
        const updateData = { ...data };
        if (data.managerId) {
            const manager = await ManagerService_1.default.getManager(data.managerId);
            if (!manager) {
                throw new Error('Manager not found');
            }
            updateData.managerName = manager.name;
            updateData.managerDni = manager.dni;
        }
        if (data.userId) {
            const user = await UserService_1.default.getUser(data.userId);
            if (!user) {
                throw new Error('User not found');
            }
            updateData.userName = user.name;
            updateData.userDni = user.dni;
        }
        return ClassRepository_1.default.update(id, updateData);
    }
    async deleteClass(id) {
        const classToDelete = await ClassRepository_1.default.findById(id);
        if (!classToDelete) {
            throw new Error('Class not found');
        }
        return ClassRepository_1.default.delete(id);
    }
    async listClasses(filter = {}) {
        return ClassRepository_1.default.list(filter);
    }
    async getClassesByManager(managerId) {
        return ClassRepository_1.default.findByManagerId(managerId);
    }
    async getClassesByUser(userId) {
        return ClassRepository_1.default.findByUserId(userId);
    }
}
exports.default = new ClassService();
//# sourceMappingURL=ClassService.js.map