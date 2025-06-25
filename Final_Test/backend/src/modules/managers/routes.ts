import { Router } from 'express';
import ManagerController from './controllers/ManagerController';
import { validateCreateManager, validateUpdateManager } from './validations';

const router = Router();

// CRUD básico
router.post('/', validateCreateManager, ManagerController.create);
router.get('/', ManagerController.list);
router.get('/:id', ManagerController.getById);
router.get('/dni/:dni', ManagerController.getByDni);
router.put('/:id', validateUpdateManager, ManagerController.update);
router.delete('/:id', ManagerController.delete);

export default router;