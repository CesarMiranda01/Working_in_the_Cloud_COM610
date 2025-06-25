// lib/api/administrator.ts
import api from '../utils/axios';
import { 
  LoginCredentials, 
  AuthResponse, 
  AdminRegisterResponse,
  AdminUpdateData,
  AdminData
} from '@/types/auth';
import { AdminRegisterInput } from '@/lib/utils/admin-validators';
import { Publish, CreatePublishData, UpdatePublishData } from '@/types/publish';

// AUTHENTICATION:

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>(
      '/administrator-auth/login',
      credentials
    );
    return response.data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  await api.post('/administrator-auth/logout');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// ADMINISTRATOR:

export const registerAdmin = async (data: AdminRegisterInput) => {
  try {
    const response = await api.post<AdminRegisterResponse>('/admin-auth', data);
    return response.data;
  } catch (error) {
    console.error('Error en registerAdmin:', error);
    throw error;
  }
};

export const updateAdmin = async (id: string, data: AdminUpdateData): Promise<AdminData> => {
  try {
    const response = await api.patch<AdminData>(`/admin-auth/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error en updateAdmin:', error);
    throw error;
  }
};

// PUBLISH

export const getAllPublish = async (): Promise<Publish[]> => {
  const response = await api.get<Publish[]>('/administrator-publish');
  return response.data;
};

export const getPublishById = async (id: string): Promise<Publish> => {
  const response = await api.get<Publish>(`/administrator-publish/${id}`);
  return response.data;
};

export const createPublish = async (data: CreatePublishData): Promise<Publish> => {
  const response = await api.post<Publish>('/administrator-publish', data);
  return response.data;
};

export const updatePublish = async (id: string, data: UpdatePublishData): Promise<Publish> => {
  const response = await api.patch<Publish>(`/administrator-publish/${id}`, data);
  return response.data;
};

export const deletePublish = async (id: string): Promise<void> => {
  await api.delete(`/administrator-publish/${id}`);
};