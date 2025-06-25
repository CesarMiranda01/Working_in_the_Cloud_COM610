import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateCreateClass = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    subject: Joi.string().required(),
    managerId: Joi.string().required(),
    userId: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};

export const validateUpdateClass = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    subject: Joi.string(),
    managerId: Joi.string(),
    userId: Joi.string()
  }).min(1);

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  next();
};