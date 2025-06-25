import prisma from '../../../core/database';
import { IUser, IUserCreate, IUserUpdate, IUserFilter } from '../interfaces';

class UserRepository {
  async create(data: IUserCreate & { managerName: string; managerDni: string }): Promise<IUser> {
    return prisma.user.create({
      data: {
        name: data.name,
        dni: data.dni,
        managerId: data.managerId,
        managerName: data.managerName,
        managerDni: data.managerDni
      }
    });
  }

  async findById(id: string): Promise<IUser | null> {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  async findByDni(dni: string): Promise<IUser | null> {
    return prisma.user.findUnique({
      where: { dni }
    });
  }

  async findByManagerId(managerId: string): Promise<IUser[]> {
    return prisma.user.findMany({
      where: { managerId }
    });
  }

  async update(id: string, data: IUserUpdate & Partial<{ managerName: string; managerDni: string }>): Promise<IUser> {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    });
  }

  async list(filter: IUserFilter = {}): Promise<IUser[]> {
    return prisma.user.findMany({
      where: {
        ...(filter.dni && { dni: filter.dni }),
        ...(filter.managerId && { managerId: filter.managerId }),
        ...(filter.name && { name: { contains: filter.name, mode: 'insensitive' } })
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}

export default new UserRepository();