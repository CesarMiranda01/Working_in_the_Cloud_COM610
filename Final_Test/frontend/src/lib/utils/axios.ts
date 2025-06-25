// lib/utils/axios.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
console.log('Valor de API_URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // Solo en el cliente
  if (typeof window === 'undefined') return config;
  
  const token = localStorage.getItem('token');
  // console.log('[axios] Token obtenido:', token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No se encontró token en localStorage');
  }
  
  return config;
});

// // Interceptor para manejar errores de autenticación
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log('Error en la respuesta:', error); // Verifica errores
//     if (error.response?.status === 401) {
//       // Redireccionar a login si no está autenticado
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('token');
//         window.location.href = '/administrators/auth/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );


// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  (config) => {
    // console.log('Configuración de la petición:', { 
    //   url: config.url,
    //   baseURL: config.baseURL,
    //   headers: config.headers
    // }); // Verifica cada petición

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;




