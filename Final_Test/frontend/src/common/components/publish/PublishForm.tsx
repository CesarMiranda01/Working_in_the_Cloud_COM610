// common/components/publish/PublishForm.tsx
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { publishSchema } from '@/lib/utils/validators';
import { CreatePublishData, Publish, UpdatePublishData } from '@/types/publish';
import { createPublish, updatePublish } from '@/lib/api/administrator';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface PublishFormProps {
  publish?: Publish;
  isEdit?: boolean;
}

export default function PublishForm({ publish, isEdit = false }: PublishFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePublishData>({
    resolver: zodResolver(publishSchema),
    defaultValues: {
      title: publish?.title || '',
      description: publish?.description || '',
      image: publish?.image || '',
      video: publish?.video || '',
      link1: publish?.link1 || '',
      link2: publish?.link2 || '',
    },
  });

  useEffect(() => {
    if (publish && isEdit) {
      reset({
        title: publish.title,
        description: publish.description,
        image: publish.image,
        video: publish.video,
        link1: publish.link1,
        link2: publish.link2,
      });
    }
  }, [publish, reset, isEdit]);

  const onSubmit = async (data: CreatePublishData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (isEdit && publish) {
        await updatePublish(publish.id, data as UpdatePublishData);
        toast.success('Publicación actualizada correctamente');
      } else {
        await createPublish(data);
        toast.success('Publicación creada correctamente');
      }
      router.push('/administrators/publish');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || 'Error al guardar la publicación');
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
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">
        {isEdit ? 'Editar publicación' : 'Crear nueva publicación'}
      </h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Título</label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block mb-1">Descripción</label>
          <textarea
            id="description"
            {...register('description')}
            className="w-full p-2 border rounded"
            rows={4}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="image" className="block mb-1">URL de la imagen</label>
          <input
            id="image"
            type="url"
            {...register('image')}
            className="w-full p-2 border rounded"
            disabled={isLoading}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="video" className="block mb-1">URL del video</label>
          <input
            id="video"
            type="url"
            {...register('video')}
            className="w-full p-2 border rounded"
            disabled={isLoading}
            placeholder="https://ejemplo.com/video.mp4"
          />
          {errors.video && (
            <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="link1" className="block mb-1">Enlace 1</label>
          <input
            id="link1"
            type="url"
            {...register('link1')}
            className="w-full p-2 border rounded"
            disabled={isLoading}
            placeholder="https://enlace1.com"
          />
          {errors.link1 && (
            <p className="text-red-500 text-sm mt-1">{errors.link1.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="link2" className="block mb-1">Enlace 2</label>
          <input
            id="link2"
            type="url"
            {...register('link2')}
            className="w-full p-2 border rounded"
            disabled={isLoading}
            placeholder="https://enlace2.com"
          />
          {errors.link2 && (
            <p className="text-red-500 text-sm mt-1">{errors.link2.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Guardando...' : isEdit ? 'Actualizar publicación' : 'Crear publicación'}
        </button>
      </form>
    </div>
  );
}