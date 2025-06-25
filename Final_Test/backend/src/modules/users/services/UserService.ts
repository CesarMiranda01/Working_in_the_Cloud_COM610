import UserRepository from '../repositories/UserRepository';
import ManagerService from '../../managers/services/ManagerService';
import { IUser, IUserCreate, IUserUpdate, IUserFilter } from '../interfaces';

class UserService {
  async createUser(data: IUserCreate): Promise<IUser> {
    // Validar DNI único
    const existingUser = await UserRepository.findByDni(data.dni);
    if (existingUser) {
      throw new Error('User with this DNI already exists');
    }

    // Obtener datos del manager para desnormalización
    const manager = await ManagerService.getManager(data.managerId);
    if (!manager) {
      throw new Error('Manager not found');
    }

    return UserRepository.create({
      ...data,
      managerName: manager.name,
      managerDni: manager.dni
    });
  }

  async getUser(id: string): Promise<IUser> { // Cambiado a retornar IUser en lugar de IUser | null
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: IUserUpdate): Promise<IUser> {
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

    return UserRepository.update(id, updateData);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Aquí podrías agregar validaciones adicionales (ej: que no tenga clases asignadas)
    
    return UserRepository.delete(id);
  }

  async listUsers(filter: IUserFilter = {}): Promise<IUser[]> {
    return UserRepository.list(filter);
  }

  async getUsersByManager(managerId: string): Promise<IUser[]> {
    return UserRepository.list({ managerId });
  }
}

export default new UserService();