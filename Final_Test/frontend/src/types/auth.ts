// types/auth.ts

// Tipos básicos para autenticación
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  username: string;
}

// Tipos para administradores
export interface AdminRegisterData {
  administrator: {
    firstName: string;
    middleName?: string;
    fatherName: string;
    motherName: string;
    dni: string;
    email: string;
    imgPerfil?: string;
    rank: number;
    position: string;
    gender: 'male' | 'female' | 'other';
    docent: boolean;
    phoneCode: number;
    telephone: string;
    birthDate: string;
  };
  administrator_auth: {
    password: string;
    passwordConfirm: string;
  };
}

export interface AdminLoginResponse {
  accessToken: string;
  refreshToken?: string;
  message: string;
  code: string;
  admin: AdminData;
  deviceId: string;
}

export interface AdminData {
  id: string;
  firstName: string;
  middleName?: string;
  fatherName: string;
  motherName: string;
  dni: string;
  email: string;
  imgPerfil?: string;
  rank: number;
  position: string;
  gender: 'male' | 'female' | 'other';
  docent: boolean;
  phoneCode: number;
  telephone: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  roles?: string[];
}

export interface AdminRegisterResponse {
  admin: AdminData;
  auth: {
    id: string;
    administratorId: string;
    email: string;
    emailOld: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface AdminUpdateData {
  firstName?: string;
  middleName?: string;
  fatherName?: string;
  motherName?: string;
  dni?: string;
  email?: string;
  imgPerfil?: string;
  rank?: number;
  position?: string;
  gender?: 'male' | 'female' | 'other';
  docent?: boolean;
  phoneCode?: number;
  telephone?: string;
  birthDate?: string;
}

// Tipos para usuarios regulares
export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  message: string;
  code: string;
  user: UserData;
  deviceId: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  lastLogin?: string;
}

// Tipos para respuestas de API
export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  message: string;
  code: string;
  user: UserData;
  admin?: AdminData; // Para casos donde el login puede devolver admin o user
  deviceId: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Tipos para recuperación de contraseña
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Tipos para auditoría
export interface AuthAuditLog {
  id: string;
  userId: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}