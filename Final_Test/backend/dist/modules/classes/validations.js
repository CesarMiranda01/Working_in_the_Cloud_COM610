"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateClass = exports.validateCreateClass = void 0;
const joi_1 = require("joi");
const validateCreateClass = (req, res, next) => {
    const schema = joi_1.default.object({
        subject: joi_1.default.string().required(),
        managerId: joi_1.default.string().required(),
        userId: joi_1.default.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateCreateClass = validateCreateClass;
const validateUpdateClass = (req, res, next) => {
    const schema = joi_1.default.object({
        subject: joi_1.default.string(),
        managerId: joi_1.default.string(),
        userId: joi_1.default.string()
    }).min(1);
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateUpdateClass = validateUpdateClass;
//# sourceMappingURL=validations.js.map