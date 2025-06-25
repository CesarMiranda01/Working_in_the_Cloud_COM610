// src/common/components/auth/RegisterForm.tsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { registerAdmin } from '@/lib/api/administrator'; 
import { adminRegisterSchema, AdminRegisterInput } from '@/lib/utils/admin-validators';
// import { useAuthStore } from '@/stores/authStore';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const { setAuth } = useAuthStore();

  // Cambia la definición del useForm:
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminRegisterInput>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      administrator: {
        gender: 'male',
        docent: false,
        phoneCode: 591,
        rank: 1,
      },
    },
  });

  const onSubmit = async (data: AdminRegisterInput) => {
    setIsLoading(true);
    console.log('Datos a enviar:', JSON.stringify(data, null, 2)); // ← Agrega esto
    try {
      const response = await registerAdmin(data);
      console.log('Respuesta del servidor:', response); // ← Y esto

      // Hacer login con los datos proporcionados.

      // setAuth(response.access_token, response.admin);
      toast.success('Administrador creado exitosamente');
      router.push('/administrators/auth/login');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'Error al registrar administrador');
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Ocurrió un error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-5 text-center">Registro de Administrador</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sección de información personal */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Información Personal</h2>
            
            <div>
              <label className="block mb-1">Nombres*</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('administrator.firstName')}
                    className="w-full p-2 border rounded"
                    disabled={isLoading}
                    placeholder="Primer nombre"
                  />
                  {errors.administrator?.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.administrator.firstName.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register('administrator.middleName')}
                    className="w-full p-2 border rounded"
                    disabled={isLoading}
                    placeholder="Segundo nombre (opcional)"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1">Apellidos*</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('administrator.fatherName')}
                    className="w-full p-2 border rounded"
                    disabled={isLoading}
                    placeholder="Apellido paterno"
                  />
                  {errors.administrator?.fatherName && (
                    <p className="text-red-500 text-sm mt-1">{errors.administrator.fatherName.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register('administrator.motherName')}
                    className="w-full p-2 border rounded"
                    disabled={isLoading}
                    placeholder="Apellido materno"
                  />
                  {errors.administrator?.motherName && (
                    <p className="text-red-500 text-sm mt-1">{errors.administrator.motherName.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1">DNI*</label>
              <input
                {...register('administrator.dni')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              />
              {errors.administrator?.dni && (
                <p className="text-red-500 text-sm mt-1">{errors.administrator.dni.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Fecha de Nacimiento*</label>
              <input
                type="date"
                {...register('administrator.birthDate')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              />
              {errors.administrator?.birthDate && (
                <p className="text-red-500 text-sm mt-1">{errors.administrator.birthDate.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Género*</label>
              <select
                {...register('administrator.gender')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              >
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>
          </div>

          {/* Sección de información profesional */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">Información Profesional</h2>
            
            <div>
              <label className="block mb-1">Correo electrónico*</label>
              <input
                type="email"
                {...register('administrator.email')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              />
              {errors.administrator?.email && (
                <p className="text-red-500 text-sm mt-1">{errors.administrator.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Cargo*</label>
              <input
                {...register('administrator.position')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
                placeholder="Ej: Coordinador"
              />
              {errors.administrator?.position && (
                <p className="text-red-500 text-sm mt-1">{errors.administrator.position.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Rango*</label>
              <select
                {...register('administrator.rank', { valueAsNumber: true })}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              {errors.administrator?.rank && (
                <p className="text-red-500 text-sm mt-1">{errors.administrator.rank.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">¿Es docente?*</label>
              <select
                {...register('administrator.docent', { 
                  setValueAs: (value) => value === '1' // Convierte a boolean
                 })}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              >
                <option value="0">No</option>
                <option value="1">Sí</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Teléfono*</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  {...register('administrator.phoneCode', { valueAsNumber: true })}
                  className="w-20 p-2 border rounded"
                  disabled={isLoading}
                />
                <input
                  type="tel"
                  {...register('administrator.telephone')}
                  className="flex-1 p-2 border rounded"
                  disabled={isLoading}
                />
              </div>
              {errors.administrator?.telephone && (
                <p className="text-red-500 text-sm mt-1">{errors.administrator.telephone.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">URL de imagen de perfil</label>
              <input
                type="url"
                {...register('administrator.imgPerfil')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
                placeholder="https://example.com/profiles/admin.jpg"
              />
            </div>
          </div>
        </div>

        {/* Sección de autenticación */}
        <div className="space-y-4 pt-4 border-t">
          <h2 className="text-lg font-semibold">Credenciales de Acceso</h2>
          
          <div>
            <label className="block mb-1">Contraseña*</label>
            <input
              type="password"
              {...register('administrator_auth.password')}
              className="w-full p-2 border rounded"
              disabled={isLoading}
            />
            {errors.administrator_auth?.password && (
              <p className="text-red-500 text-sm mt-1">{errors.administrator_auth.password.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Confirmar Contraseña*</label>
            <input
              type="password"
              {...register('administrator_auth.passwordConfirm')}
              className="w-full p-2 border rounded"
              disabled={isLoading}
            />
            {errors.administrator_auth?.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {errors.administrator_auth.passwordConfirm.message}
                </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors mt-6"
        >
          {isLoading ? 'Registrando administrador...' : 'Registrar Administrador'}
        </button>
      </form>
    </div>
  );
}