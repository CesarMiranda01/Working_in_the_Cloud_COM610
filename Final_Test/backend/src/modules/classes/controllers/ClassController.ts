import { Request, Response } from 'express';
import ClassService from '../services/ClassService';
import { IClassCreate, IClassUpdate } from '../interfaces';

class ClassController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const classData: IClassCreate = req.body;
      const newClass = await ClassService.createClass(classData);
      res.status(201).json(newClass);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const classItem = await ClassService.getClass(id);
      if (!classItem) {
        res.status(404).json({ error: 'Class not found' });
        return;
      }
      res.json(classItem);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IClassUpdate = req.body;
      const updatedClass = await ClassService.updateClass(id, updateData);
      res.json(updatedClass);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await ClassService.deleteClass(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { subject, managerId, userId } = req.query;
      const classes = await ClassService.listClasses({ 
        subject: subject as string,
        managerId: managerId as string,
        userId: userId as string
      });
      res.json(classes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByManager(req: Request<{ managerId: string }>, res: Response): Promise<void> {
    try {
      const { managerId } = req.params;
      const classes = await ClassService.getClassesByManager(managerId);
      res.json(classes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByUser(req: Request<{ userId: string }>, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const classes = await ClassService.getClassesByUser(userId);
      res.json(classes);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

const classControllerInstance = new ClassController();
export default classControllerInstance;