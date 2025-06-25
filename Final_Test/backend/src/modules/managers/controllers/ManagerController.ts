import { Request, Response } from 'express';
import ManagerService from '../services/ManagerService';
import { IManagerCreate, IManagerUpdate } from '../interfaces';

class ManagerController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const managerData: IManagerCreate = req.body;
      const manager = await ManagerService.createManager(managerData);
      res.status(201).json(manager);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const manager = await ManagerService.getManager(id);
      if (!manager) {
        res.status(404).json({ error: 'Manager not found' });
        return;
      }
      res.json(manager);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByDni(req: Request<{ dni: string }>, res: Response): Promise<void> {
    try {
      const { dni } = req.params;
      const manager = await ManagerService.getManagerByDni(dni);
      if (!manager) {
        res.status(404).json({ error: 'Manager not found' });
        return;
      }
      res.json(manager);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IManagerUpdate = req.body;
      const updatedManager = await ManagerService.updateManager(id, updateData);
      res.json(updatedManager);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await ManagerService.deleteManager(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { dni, name, minAge, maxAge } = req.query;
      const managers = await ManagerService.listManagers({ 
        dni: dni as string,
        name: name as string,
        minAge: minAge ? parseInt(minAge as string) : undefined,
        maxAge: maxAge ? parseInt(maxAge as string) : undefined
      });
      res.json(managers);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new ManagerController();