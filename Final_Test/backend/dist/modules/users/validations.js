"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateCreateUser = void 0;
const joi_1 = require("joi");
const validateCreateUser = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        dni: joi_1.default.string().required(),
        managerId: joi_1.default.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateCreateUser = validateCreateUser;
const validateUpdateUser = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string(),
        managerId: joi_1.default.string()
    }).min(1);
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateUpdateUser = validateUpdateUser;
//# sourceMappingURL=validations.js.map