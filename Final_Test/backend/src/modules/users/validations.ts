import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateCreateUser = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string().required(),
    dni: Joi.string().required(),
    managerId: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string(),
    managerId: Joi.string()
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};