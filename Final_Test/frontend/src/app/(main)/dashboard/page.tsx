'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getAllPublish } from '@/lib/api/administrator';
import { Publish } from '@/types/publish';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [publish, setPublish] = useState<Publish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publishData = await getAllPublish();
        setPublish(publishData);
      } catch (error) {
        console.error('Error al cargar datos', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Cargando datos...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Información de usuario</h2>
        <p><strong>Nombre:</strong> {user?.firstName}</p>
        <p><strong>Correo:</strong> {user?.email}</p>
        <p><strong>Usuario:</strong> {user?.lastName}</p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Publishos recientes</h2>
          <Link href="/administrators/publish" className="text-blue-500 hover:underline">
            Ver todos
          </Link>
        </div>
        
        {publish.length === 0 ? (
          <p>No hay publicaciones disponibles.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Precio</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {publish.slice(0, 5).map((publish) => (
                  <tr key={publish.id} className="border-b">
                    <td className="px-4 py-2">{publish.title}</td>
                    <td className="px-4 py-2">${publish.description}</td>
                    {/* <td className="px-4 py-2">{publish.image}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}