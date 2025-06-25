import prisma from '../../../core/database';
import { IClass, IClassCreate, IClassUpdate, IClassFilter } from '../interfaces';

class ClassRepository {
  async create(data: IClassCreate & { 
    managerName: string;
    managerDni: string;
    userName: string;
    userDni: string;
  }): Promise<IClass> {
    return await prisma.class.create({
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

  async findById(id: string): Promise<IClass | null> {
    return await prisma.class.findUnique({
      where: { id }
    });
  }

  async findByManagerId(managerId: string): Promise<IClass[]> {
    return await prisma.class.findMany({
      where: { managerId }
    });
  }

  async findByUserId(userId: string): Promise<IClass[]> {
    return await prisma.class.findMany({
      where: { userId }
    });
  }

  async update(
    id: string, 
    data: IClassUpdate & Partial<{ 
      managerName: string;
      managerDni: string;
      userName: string;
      userDni: string;
    }>
  ): Promise<IClass> {
    return await prisma.class.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.class.delete({
      where: { id }
    });
  }

  async list(filter: IClassFilter = {}): Promise<IClass[]> {
    return await prisma.class.findMany({
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
export default classRepositoryInstance;