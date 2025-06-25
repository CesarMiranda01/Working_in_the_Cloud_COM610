// import api from '../utils/axios';
// import { Product, CreateProductData, UpdateProductData } from '@/types/product';

// export const getAllProducts = async (): Promise<Product[]> => {
//   const response = await api.get<Product[]>('/administrator-publish');
//   return response.data;
// };

// export const getProductById = async (id: string): Promise<Product> => {
//   const response = await api.get<Product>(`/administrator-publish/${id}`);
//   return response.data;
// };

// export const createProduct = async (data: CreateProductData): Promise<Product> => {
//   const response = await api.post<Product>('/administrator-publish', data);
//   return response.data;
// };

// export const updateProduct = async (id: string, data: UpdateProductData): Promise<Product> => {
//   const response = await api.patch<Product>(`/administrator-publish/${id}`, data);
//   return response.data;
// };

// export const deleteProduct = async (id: string): Promise<void> => {
//   await api.delete(`/administrator-publish/${id}`);
// };