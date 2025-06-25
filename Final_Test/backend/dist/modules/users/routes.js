"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controllers/UserController");
const validations_1 = require("./validations");
const router = (0, express_1.Router)();
router.post('/', validations_1.validateCreateUser, UserController_1.default.create);
router.get('/', UserController_1.default.list);
router.get('/:id', UserController_1.default.getById);
router.put('/:id', validations_1.validateUpdateUser, UserController_1.default.update);
router.delete('/:id', UserController_1.default.delete);
router.get('/manager/:managerId', UserController_1.default.getByManager);
exports.default = router;
//# sourceMappingURL=routes.js.map