"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ManagerController_1 = require("./controllers/ManagerController");
const validations_1 = require("./validations");
const router = (0, express_1.Router)();
router.post('/', validations_1.validateCreateManager, ManagerController_1.default.create);
router.get('/', ManagerController_1.default.list);
router.get('/:id', ManagerController_1.default.getById);
router.get('/dni/:dni', ManagerController_1.default.getByDni);
router.put('/:id', validations_1.validateUpdateManager, ManagerController_1.default.update);
router.delete('/:id', ManagerController_1.default.delete);
exports.default = router;
//# sourceMappingURL=routes.js.map