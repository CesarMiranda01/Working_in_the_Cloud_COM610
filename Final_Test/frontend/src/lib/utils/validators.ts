//lib/utils/validatos.ts
import { z } from 'zod';


// Esquema base para administrador
const adminBaseSchema = {
  firstName: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  middleName: z.string().optional(),
  fatherName: z.string().min(2, 'Apellido paterno requerido'),
  motherName: z.string().min(2, 'Apellido materno requerido'),
  dni: z.string().min(6, 'DNI debe tener al menos 6 caracteres'),
  email: z.string().email('Email inválido'),
  imgPerfil: z.string().url('URL de imagen inválida').optional(),
  rank: z.number().int('Rango debe ser un número entero'),
  position: z.string().min(3, 'Cargo debe tener al menos 3 caracteres'),
  gender: z.enum(['male', 'female', 'other']),
  docent: z.boolean(),
  phoneCode: z.number().int('Código de país inválido'),
  telephone: z.string().min(8, 'Teléfono debe tener al menos 8 dígitos'),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
};

export const adminRegisterSchema = z.object({
  administrator: z.object(adminBaseSchema),
  administrator_auth: z.object({
    password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número')
      .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
    passwordConfirm: z.string()
  }).refine(data => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"]
  })
});


export const adminUpdateSchema = z.object({
  firstName: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').optional(),
  middleName: z.string().optional(),
  fatherName: z.string().min(2, 'Apellido paterno requerido').optional(),
  motherName: z.string().min(2, 'Apellido materno requerido').optional(),
  dni: z.string().min(6, 'DNI debe tener al menos 6 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  imgPerfil: z.string().url('URL de imagen inválida').optional(),
  rank: z.number().int('Rango debe ser un número entero').optional(),
  position: z.string().min(3, 'Cargo debe tener al menos 3 caracteres').optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  docent: z.boolean().optional(),
  phoneCode: z.number().int('Código de país inválido').optional(),
  telephone: z.string().min(8, 'Teléfono debe tener al menos 8 dígitos').optional(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)').optional()
});


export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  fullName: z.string().min(3, 'El nombre completo debe tener al menos 3 caracteres'),
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
});

export const updateUserSchema = z.object({
  fullName: z.string().min(3, 'El nombre completo debe tener al menos 3 caracteres').optional(),
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres').optional(),
});

export const publishSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  image: z.string().url('La imagen debe ser una URL válida').optional(),
  video: z.string().url('El video debe ser una URL válida').optional(),
  link1: z.string().url('El enlace 1 debe ser una URL válida').optional(),
  link2: z.string().url('El enlace 2 debe ser una URL válida').optional(),
});

export const updatePublishSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres').optional(),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').optional(),
  image: z.string().url('La imagen debe ser una URL válida').optional(),
  video: z.string().url('El video debe ser una URL válida').optional(),
  link1: z.string().url('El enlace 1 debe ser una URL válida').optional(),
  link2: z.string().url('El enlace 2 debe ser una URL válida').optional(),
});