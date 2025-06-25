// src/app/(main)/dashboard/profile/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/authStore';
import { updateAdmin } from '@/lib/api/administrator';
import { AdminUpdateData } from '@/types/auth';
import { adminUpdateSchema } from '@/lib/utils/validators';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export default function AdminProfilePage() {
  const { user, token, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminUpdateData>({
    resolver: zodResolver(adminUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      // position: user?.position || '',
      // phoneCode: user?.phoneCode || 591, // Valor por defecto para Bolivia
      // telephone: user?.telephone || '',
      // dni: user?.dni || '',
      // gender: user?.gender || 'other',
      // docent: user?.docent || false,
      // Agrega otros campos según necesidad
    } as AdminUpdateData, // Asegura el tipo correcto
  });

  const onSubmit = async (data: AdminUpdateData) => {
    if (!user || !token || !user.id) {
      toast.error('No se pudo identificar al usuario');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const updatedAdmin = await updateAdmin(user.id, data);
      
      // Actualizar el store con los nuevos datos
      setAuth(token, {
        ...user,
        ...updatedAdmin,
      });
      
      toast.success('Perfil actualizado correctamente');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'Error al actualizar el perfil');
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Ocurrió un error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center py-10">Cargando perfil...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mi perfil de administrador</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Información de cuenta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <p><strong>Nombre:</strong> {user.firstName} {user.middleName || ''}</p>
          <p><strong>Apellidos:</strong> {user.fatherName} {user.motherName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>DNI:</strong> {user.dni}</p>
          <p><strong>Cargo:</strong> {user.position}</p>
          <p><strong>Teléfono:</strong> +{user.phoneCode} {user.telephone}</p>
          <p><strong>Género:</strong> 
            {user.gender === 'male' ? 'Masculino' : 
             user.gender === 'female' ? 'Femenino' : 'Otro'}
          </p>
          <p><strong>Docente:</strong> {user.docent ? 'Sí' : 'No'}</p> */}
          {user.createdAt && (
            <p><strong>Fecha de creación:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          )}
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Editar perfil</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block mb-1">Nombre</label>
              <input
                id="firstName"
                type="text"
                {...register('firstName')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="fatherName" className="block mb-1">Apellido Paterno</label>
              <input
                id="fatherName"
                type="text"
                {...register('fatherName')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              />
              {errors.fatherName && (
                <p className="text-red-500 text-sm mt-1">{errors.fatherName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="motherName" className="block mb-1">Apellido Materno</label>
              <input
                id="motherName"
                type="text"
                {...register('motherName')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              />
              {errors.motherName && (
                <p className="text-red-500 text-sm mt-1">{errors.motherName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="position" className="block mb-1">Cargo</label>
              <input
                id="position"
                type="text"
                {...register('position')}
                className="w-full p-2 border rounded"
                disabled={isLoading}
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="telephone" className="block mb-1">Teléfono</label>
              <div className="flex">
                <select
                  {...register('phoneCode', { valueAsNumber: true })}
                  className="p-2 border rounded-l"
                  disabled={isLoading}
                >
                  <option value="591">+591 (Bolivia)</option>
                  <option value="51">+51 (Perú)</option>
                  <option value="54">+54 (Argentina)</option>
                </select>
                <input
                  id="telephone"
                  type="text"
                  {...register('telephone')}
                  className="flex-1 p-2 border-t border-b border-r rounded-r"
                  disabled={isLoading}
                />
              </div>
              {errors.telephone && (
                <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? 'Guardando...' : 'Actualizar perfil'}
          </button>
        </form>
      </div>
    </div>
  );
}