import ClassRepository from '../repositories/ClassRepository';
import ManagerService from '../../managers/services/ManagerService';
import UserService from '../../users/services/UserService';
import { IClass, IClassCreate, IClassUpdate, IClassFilter } from '../interfaces';

class ClassService {
  async createClass(data: IClassCreate): Promise<IClass> {
    // Validar y obtener datos del manager
    const manager = await ManagerService.getManager(data.managerId);
    if (!manager) {
      throw new Error('Manager not found');
    }

    // Validar y obtener datos del usuario
    const user = await UserService.getUser(data.userId);
    if (!user) {
      throw new Error('User not found');
    }

    return ClassRepository.create({
      subject: data.subject,
      managerId: manager.id,
      managerName: manager.name,
      managerDni: manager.dni,
      userId: user.id,
      userName: user.name,
      userDni: user.dni
    });
  }

  async getClass(id: string): Promise<IClass | null> {
    return ClassRepository.findById(id);
  }

  async updateClass(id: string, data: IClassUpdate): Promise<IClass> {
    const updateData: any = { ...data };

    // Si se actualiza el manager, obtener sus nuevos datos
    if (data.managerId) {
      const manager = await ManagerService.getManager(data.managerId);
      if (!manager) {
        throw new Error('Manager not found');
      }
      updateData.managerName = manager.name;
      updateData.managerDni = manager.dni;
    }

    // Si se actualiza el usuario, obtener sus nuevos datos
    if (data.userId) {
      const user = await UserService.getUser(data.userId);
      if (!user) {
        throw new Error('User not found');
      }
      updateData.userName = user.name;
      updateData.userDni = user.dni;
    }

    return ClassRepository.update(id, updateData);
  }

  async deleteClass(id: string): Promise<void> {
    const classToDelete = await ClassRepository.findById(id);
    if (!classToDelete) {
      throw new Error('Class not found');
    }

    return ClassRepository.delete(id);
  }

  async listClasses(filter: IClassFilter = {}): Promise<IClass[]> {
    return ClassRepository.list(filter);
  }

  async getClassesByManager(managerId: string): Promise<IClass[]> {
    return ClassRepository.findByManagerId(managerId);
  }

  async getClassesByUser(userId: string): Promise<IClass[]> {
    return ClassRepository.findByUserId(userId);
  }
}

export default new ClassService();