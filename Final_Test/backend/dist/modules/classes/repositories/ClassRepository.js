"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../core/database");
class ClassRepository {
    async create(data) {
        return await database_1.default.class.create({
            data: {
                subject: data.subject,
                managerId: data.managerId,
                managerName: data.managerName,
                managerDni: data.managerDni,
                userId: data.userId,
                userName: data.userName,
                userDni: data.userDni
            }
        });
    }
    async findById(id) {
        return await database_1.default.class.findUnique({
            where: { id }
        });
    }
    async findByManagerId(managerId) {
        return await database_1.default.class.findMany({
            where: { managerId }
        });
    }
    async findByUserId(userId) {
        return await database_1.default.class.findMany({
            where: { userId }
        });
    }
    async update(id, data) {
        return await database_1.default.class.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        await database_1.default.class.delete({
            where: { id }
        });
    }
    async list(filter = {}) {
        return await database_1.default.class.findMany({
            where: {
                ...(filter.subject && {
                    subject: {
                        contains: filter.subject,
                        mode: 'insensitive'
                    }
                }),
                ...(filter.managerId && { managerId: filter.managerId }),
                ...(filter.userId && { userId: filter.userId })
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
const classRepositoryInstance = new ClassRepository();
exports.default = classRepositoryInstance;
//# sourceMappingURL=ClassRepository.js.map