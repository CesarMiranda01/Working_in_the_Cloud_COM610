// src/lib/utils/validators.ts
import { z } from 'zod';

// Validación para el teléfono (ejemplo: 987654321)
const phoneRegex = /^\d{7,15}$/;

// Esquema para los datos del administrador
const administratorSchema = z.object({
  firstName: z.string()
    .min(2, 'El primer nombre debe tener al menos 2 caracteres')
    .max(50, 'El primer nombre no puede exceder los 50 caracteres'),
  
  middleName: z.string()
    .max(50, 'El segundo nombre no puede exceder los 50 caracteres')
    .optional(),
  
  fatherName: z.string()
    .min(2, 'El apellido paterno debe tener al menos 2 caracteres')
    .max(50, 'El apellido paterno no puede exceder los 50 caracteres'),
  
  motherName: z.string()
    .min(2, 'El apellido materno debe tener al menos 2 caracteres')
    .max(50, 'El apellido materno no puede exceder los 50 caracteres'),
  
  dni: z.string()
    .min(8, 'El DNI debe tener 8 caracteres')
    .max(8, 'El DNI debe tener 8 caracteres')
    .regex(/^\d+$/, 'El DNI solo debe contener números'),
  
  email: z.string()
    .email('Ingrese un correo electrónico válido')
    .max(100, 'El correo no puede exceder los 100 caracteres'),
  
  imgPerfil: z.string()
    .url('Ingrese una URL válida')
    .optional(),
  
  rank: z.number()
    .int('El rango debe ser un número entero')
    .min(1, 'El rango mínimo es 1')
    .max(10, 'El rango máximo es 10'),
  
  position: z.string()
    .min(2, 'El cargo debe tener al menos 2 caracteres')
    .max(100, 'El cargo no puede exceder los 100 caracteres'),
  
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Seleccione un género válido' })
  }),
  
  docent: z.boolean(),
  
  phoneCode: z.number()
    .int('El código de país debe ser un número entero')
    .min(1, 'Código de país inválido'),
  
  telephone: z.string()
    .regex(phoneRegex, 'Número de teléfono inválido'),
  
  birthDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), 'Fecha de nacimiento inválida')
    .refine((val) => {
      const birthDate = new Date(val);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 100); // Máximo 100 años
      const maxDate = new Date();
      maxDate.setFullYear(today.getFullYear() - 18); // Mínimo 18 años
      return birthDate >= minDate && birthDate <= maxDate;
    }, 'Debe tener entre 18 y 100 años')
});

// Esquema para las credenciales de autenticación
const administratorAuthSchema = z.object({
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'La contraseña no puede exceder los 50 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
  
  passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
  message: 'Las contraseñas no coinciden',
  path: ['passwordConfirm']
});

// Esquema combinado para el registro de administrador
export const adminRegisterSchema = z.object({
  administrator: administratorSchema,
  administrator_auth: administratorAuthSchema
});

// Tipos TypeScript derivados de los esquemas
export type AdminRegisterInput = z.infer<typeof adminRegisterSchema>;
export type AdministratorInput = z.infer<typeof administratorSchema>;
export type AdministratorAuthInput = z.infer<typeof administratorAuthSchema>;