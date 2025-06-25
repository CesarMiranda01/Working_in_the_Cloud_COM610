"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../core/database");
class ManagerRepository {
    async create(data) {
        return database_1.default.manager.create({
            data
        });
    }
    async findById(id) {
        return database_1.default.manager.findUnique({
            where: { id }
        });
    }
    async findByDni(dni) {
        return database_1.default.manager.findUnique({
            where: { dni }
        });
    }
    async update(id, data) {
        return database_1.default.manager.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        await database_1.default.manager.delete({
            where: { id }
        });
    }
    async list(filter = {}) {
        return database_1.default.manager.findMany({
            where: {
                ...(filter.dni && { dni: filter.dni }),
                ...(filter.name && { name: { contains: filter.name, mode: 'insensitive' } }),
                ...((filter.minAge || filter.maxAge) && {
                    age: {
                        ...(filter.minAge && { gte: filter.minAge }),
                        ...(filter.maxAge && { lte: filter.maxAge })
                    }
                })
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
exports.default = new ManagerRepository();
//# sourceMappingURL=ManagerRepository.js.map