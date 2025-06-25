"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClassController_1 = require("./controllers/ClassController");
const validations_1 = require("./validations");
const router = (0, express_1.Router)();
router.post('/', validations_1.validateCreateClass, ClassController_1.default.create);
router.get('/', ClassController_1.default.list);
router.get('/:id', ClassController_1.default.getById);
router.put('/:id', validations_1.validateUpdateClass, ClassController_1.default.update);
router.delete('/:id', ClassController_1.default.delete);
router.get('/manager/:managerId', ClassController_1.default.getByManager);
router.get('/user/:userId', ClassController_1.default.getByUser);
exports.default = router;
//# sourceMappingURL=routes.js.map