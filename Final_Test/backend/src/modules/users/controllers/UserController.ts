// import { Request, Response } from 'express';
// import UserService from '../services/UserService';
// import { IUserCreate, IUserUpdate } from '../interfaces';

// class UserController {
//   async create(req: Request, res: Response) {
//     try {
//       const userData: IUserCreate = req.body;
//       const user = await UserService.createUser(userData);
//       res.status(201).json(user);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }

//   async getById(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const user = await UserService.getUser(id);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json(user);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }

//   async update(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const updateData: IUserUpdate = req.body;
//       const updatedUser = await UserService.updateUser(id, updateData);
//       res.json(updatedUser);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }

//   async delete(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       await UserService.deleteUser(id);
//       res.status(204).send();
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }

//   async list(req: Request, res: Response) {
//     try {
//       const { dni, managerId, name } = req.query;
//       const users = await UserService.listUsers({ 
//         dni: dni as string,
//         managerId: managerId as string,
//         name: name as string
//       });
//       res.json(users);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }

//   async getByManager(req: Request, res: Response) {
//     try {
//       const { managerId } = req.params;
//       const users = await UserService.getUsersByManager(managerId);
//       res.json(users);
//     } catch (error: any) {
//       res.status(400).json({ error: error.message });
//     }
//   }
// }

// export default new UserController();

import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { IUserCreate, IUserUpdate } from '../interfaces';

class UserController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userData: IUserCreate = req.body;
      const user = await UserService.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.getUser(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: IUserUpdate = req.body;
      const updatedUser = await UserService.updateUser(id, updateData);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const { dni, managerId, name } = req.query;
      const users = await UserService.listUsers({ 
        dni: dni as string,
        managerId: managerId as string,
        name: name as string
      });
      res.json(users);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getByManager(req: Request<{ managerId: string }>, res: Response): Promise<void> {
    try {
      const { managerId } = req.params;
      const users = await UserService.getUsersByManager(managerId);
      res.json(users);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();