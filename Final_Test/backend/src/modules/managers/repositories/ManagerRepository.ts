import prisma from '../../../core/database';
import { IManager, IManagerCreate, IManagerUpdate, IManagerFilter } from '../interfaces';

class ManagerRepository {
  async create(data: IManagerCreate): Promise<IManager> {
    return prisma.manager.create({
      data
    });
  }

  async findById(id: string): Promise<IManager | null> {
    return prisma.manager.findUnique({
      where: { id }
    });
  }

  async findByDni(dni: string): Promise<IManager | null> {
    return prisma.manager.findUnique({
      where: { dni }
    });
  }

  async update(id: string, data: IManagerUpdate): Promise<IManager> {
    return prisma.manager.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.manager.delete({
      where: { id }
    });
  }

  async list(filter: IManagerFilter = {}): Promise<IManager[]> {
    return prisma.manager.findMany({
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

export default new ManagerRepository();