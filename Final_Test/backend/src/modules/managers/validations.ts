import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateCreateManager = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string().required(),
    dni: Joi.string().required(),
    age: Joi.number().integer().min(18).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};

export const validateUpdateManager = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    name: Joi.string(),
    dni: Joi.string(),
    age: Joi.number().integer().min(18)
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};