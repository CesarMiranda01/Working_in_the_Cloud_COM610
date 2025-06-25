"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../core/database");
class UserRepository {
    async create(data) {
        return database_1.default.user.create({
            data: {
                name: data.name,
                dni: data.dni,
                managerId: data.managerId,
                managerName: data.managerName,
                managerDni: data.managerDni
            }
        });
    }
    async findById(id) {
        return database_1.default.user.findUnique({
            where: { id }
        });
    }
    async findByDni(dni) {
        return database_1.default.user.findUnique({
            where: { dni }
        });
    }
    async findByManagerId(managerId) {
        return database_1.default.user.findMany({
            where: { managerId }
        });
    }
    async update(id, data) {
        return database_1.default.user.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        await database_1.default.user.delete({
            where: { id }
        });
    }
    async list(filter = {}) {
        return database_1.default.user.findMany({
            where: {
                ...(filter.dni && { dni: filter.dni }),
                ...(filter.managerId && { managerId: filter.managerId }),
                ...(filter.name && { name: { contains: filter.name, mode: 'insensitive' } })
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
exports.default = new UserRepository();
//# sourceMappingURL=UserRepository.js.map