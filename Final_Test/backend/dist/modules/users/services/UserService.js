"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("../repositories/UserRepository");
const ManagerService_1 = require("../../managers/services/ManagerService");
class UserService {
    async createUser(data) {
        const existingUser = await UserRepository_1.default.findByDni(data.dni);
        if (existingUser) {
            throw new Error('User with this DNI already exists');
        }
        const manager = await ManagerService_1.default.getManager(data.managerId);
        if (!manager) {
            throw new Error('Manager not found');
        }
        return UserRepository_1.default.create({
            ...data,
            managerName: manager.name,
            managerDni: manager.dni
        });
    }
    async getUser(id) {
        const user = await UserRepository_1.default.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    async updateUser(id, data) {
        const updateData = { ...data };
        if (data.managerId) {
            const manager = await ManagerService_1.default.getManager(data.managerId);
            if (!manager) {
                throw new Error('Manager not found');
            }
            updateData.managerName = manager.name;
            updateData.managerDni = manager.dni;
        }
        return UserRepository_1.default.update(id, updateData);
    }
    async deleteUser(id) {
        const user = await UserRepository_1.default.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return UserRepository_1.default.delete(id);
    }
    async listUsers(filter = {}) {
        return UserRepository_1.default.list(filter);
    }
    async getUsersByManager(managerId) {
        return UserRepository_1.default.list({ managerId });
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map