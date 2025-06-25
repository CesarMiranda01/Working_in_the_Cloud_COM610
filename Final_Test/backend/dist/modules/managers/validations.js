"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateManager = exports.validateCreateManager = void 0;
const joi_1 = require("joi");
const validateCreateManager = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        dni: joi_1.default.string().required(),
        age: joi_1.default.number().integer().min(18).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateCreateManager = validateCreateManager;
const validateUpdateManager = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string(),
        dni: joi_1.default.string(),
        age: joi_1.default.number().integer().min(18)
    }).min(1);
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateUpdateManager = validateUpdateManager;
//# sourceMappingURL=validations.js.map