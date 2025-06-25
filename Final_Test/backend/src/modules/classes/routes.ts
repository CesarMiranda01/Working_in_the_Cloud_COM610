import { Router } from 'express';
import ClassController from './controllers/ClassController';
import { validateCreateClass, validateUpdateClass } from './validations';

const router = Router();

// CRUD básico
router.post('/', validateCreateClass, ClassController.create);
router.get('/', ClassController.list);
router.get('/:id', ClassController.getById);
router.put('/:id', validateUpdateClass, ClassController.update);
router.delete('/:id', ClassController.delete);

// Rutas específicas
router.get('/manager/:managerId', ClassController.getByManager);
router.get('/user/:userId', ClassController.getByUser);

export default router;