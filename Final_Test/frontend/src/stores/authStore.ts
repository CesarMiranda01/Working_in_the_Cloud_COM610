// stores/authStore.ts
import { create } from 'zustand';
import { UserData } from '@/types/auth';

interface AuthState {
  token: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: UserData) => void;
  clearAuth: () => void;
}

// Inicializar con valores del localStorage (solo en el cliente)
const getInitialState = (): Pick<AuthState, 'token' | 'user' | 'isAuthenticated'> => {
  if (typeof window === 'undefined') {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  }

  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return {
    token,
    user,
    isAuthenticated: !!token && !!user,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),
  
  setAuth: (token: string, user: UserData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    set({
      token,
      user,
      isAuthenticated: true,
    });
  },
  
  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));