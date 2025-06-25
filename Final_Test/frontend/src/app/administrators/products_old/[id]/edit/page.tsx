//src/app/(main)/publishs/[id]/edit/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPublishById } from '@/lib/api/administrator';
import { Publish } from '@/types/publish';
import PublishForm from '@/common/components/publish/PublishForm';
import LoadingSpinner from '@/common/components/common/LoadingSpinner';

import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export default function EditPublishPage() {
  const params = useParams();
  const router = useRouter();
  const publishId = params.id as string;
  
  const [publish, setPublish] = useState<Publish | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublish = async () => {
      try {
        const data = await getPublishById(publishId);
        setPublish(data);
      // } catch (err: any) {
      //   setError(err.response?.data?.message || 'Error al cargar el publisho');
      } catch (err: unknown) { // Cambiado de any a unknown
      if (err instanceof AxiosError) { // Verificar si es un error de Axios
        toast.error(err.response?.data?.message || 'Error al cargar el publisho');
      } else if (err instanceof Error) { // Verificar si es un Error genérico
        toast.error(err.message);
      } else {
        toast.error('Ocurrió un error desconocido');
      }

      } finally {
        setIsLoading(false);
      }
    };

    fetchPublish();
  }, [publishId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!publish) {
    return (
      <div className="text-center">
        <p>No se encontró el publisho.</p>
        <button
          onClick={() => router.push('/publishs')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Volver a publishos
        </button>
      </div>
    );
  }

  return (
    <div>
      <PublishForm publish={publish} isEdit={true} />
    </div>
  );
}