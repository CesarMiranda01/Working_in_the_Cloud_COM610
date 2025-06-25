import { Router } from 'express';
import UserController from './controllers/UserController';
import { validateCreateUser, validateUpdateUser } from './validations';

const router = Router();

// CRUD básico
router.post('/', validateCreateUser, UserController.create);
router.get('/', UserController.list);
router.get('/:id', UserController.getById);
router.put('/:id', validateUpdateUser, UserController.update);
router.delete('/:id', UserController.delete);

// Rutas específicas
router.get('/manager/:managerId', UserController.getByManager);

export default router;