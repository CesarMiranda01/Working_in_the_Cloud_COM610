// common/components/publish/PublishList.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Publish } from '@/types/publish';
import { getAllPublish, deletePublish } from '@/lib/api/administrator';
import PublishCard from './PublishCard';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export default function PublishList() {
  const [publishes, setPublishes] = useState<Publish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPublish = async () => {
    setIsLoading(true);
    
    try {
      const data = await getAllPublish();
      setPublishes(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'Error al cargar las publicaciones');
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Ocurrió un error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublish();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta publicación?')) {
      try {
        await deletePublish(id);
        setPublishes(publishes.filter(publish => publish.id !== id));
        toast.success('Publicación eliminada correctamente');
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data?.message || 'Error al eliminar la publicación');
        } else if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('Ocurrió un error desconocido');
        }
      }
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Cargando publicaciones...</div>;
  }

  if (publishes.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>No hay publicaciones disponibles.</p>
        <Link href="/administrators/publish/create" className="text-blue-500 hover:underline mt-2 inline-block">
          Crear nueva publicación
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Publicaciones</h1>
        <Link 
          href="/administrators/publish/create" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nueva publicación
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishes.map((publish) => (
          <PublishCard 
            key={publish.id} 
            publish={publish} 
            onDelete={() => handleDelete(publish.id)}
          />
        ))}
      </div>
    </div>
  );
}