//src/common/components/auth/Loginform.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/administrator';
import { loginSchema } from '@/lib/utils/validators';
import { LoginCredentials } from '@/types/auth';
import { useAuthStore } from '@/stores/authStore';
import { AxiosError } from 'axios';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const getClientIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || 'unknown';
    } catch {
      return 'unknown';
    }
  };

  const getUserAgent = () => {
    return navigator.userAgent || 'unknown';
  };

  const onSubmit = async (formData: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      
      const ip = await getClientIp();
      const userAgent = getUserAgent();

      const loginData = {
        ...formData,
        ip,
        userAgent
      };

      const response = await login(loginData);
      // console.log(" [LoginForm] token recibido es", response.accessToken);
      setAuth(response.accessToken, response.user);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Error al iniciar sesión');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Iniciar sesión</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Correo electrónico</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block mb-1">Contraseña</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}