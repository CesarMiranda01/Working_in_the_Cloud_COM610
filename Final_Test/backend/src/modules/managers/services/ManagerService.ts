import ManagerRepository from '../repositories/ManagerRepository';
import { IManager, IManagerCreate, IManagerUpdate, IManagerFilter } from '../interfaces';

class ManagerService {
  async createManager(data: IManagerCreate): Promise<IManager> {
    // Validar que el DNI no exista
    const existingManager = await ManagerRepository.findByDni(data.dni);
    if (existingManager) {
      throw new Error('Manager with this DNI already exists');
    }

    // Validar edad mínima
    if (data.age < 18) {
      throw new Error('Manager must be at least 18 years old');
    }

    return ManagerRepository.create(data);
  }

  async getManager(id: string): Promise<IManager> { // Cambiado a retornar IManager en lugar de IManager | null
    const manager = await ManagerRepository.findById(id);
    if (!manager) {
      throw new Error('Manager not found');
    }
    return manager;
  }

  async getManagerByDni(dni: string): Promise<IManager | null> {
    return ManagerRepository.findByDni(dni);
  }

  async updateManager(id: string, data: IManagerUpdate): Promise<IManager> {
    const existingManager = await ManagerRepository.findById(id);
    if (!existingManager) {
      throw new Error('Manager not found');
    }

    // Si se actualiza el DNI, verificar que no exista otro con el mismo DNI
    if (data.dni && data.dni !== existingManager.dni) {
      const dniExists = await ManagerRepository.findByDni(data.dni);
      if (dniExists) {
        throw new Error('Another manager with this DNI already exists');
      }
    }

    return ManagerRepository.update(id, data);
  }

  async deleteManager(id: string): Promise<void> {
    const manager = await ManagerRepository.findById(id);
    if (!manager) {
      throw new Error('Manager not found');
    }

    // Aquí podrías agregar validaciones adicionales antes de eliminar
    // Por ejemplo, verificar que no tenga usuarios asociados

    return ManagerRepository.delete(id);
  }

  async listManagers(filter: IManagerFilter = {}): Promise<IManager[]> {
    return ManagerRepository.list(filter);
  }
}

export default new ManagerService();