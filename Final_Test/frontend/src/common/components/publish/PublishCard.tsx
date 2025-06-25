// common/components/publish/PublishCard.tsx
import Link from 'next/link';
import { Publish } from '@/types/publish';

interface PublishCardProps {
  publish: Publish;
  onDelete: () => void;
}

export default function PublishCard({ publish, onDelete }: PublishCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Mostrar imagen si existe */}
      {publish.image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={publish.image} 
            alt={publish.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{publish.title}</h2>
        <p className="text-gray-600 mb-3 line-clamp-3">{publish.description}</p>
        
        {/* Mostrar video si existe (solo el enlace) */}
        {publish.video && (
          <div className="mb-3">
            <p className="text-sm font-medium">Video:</p>
            <a 
              href={publish.video} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 text-sm hover:underline break-all"
            >
              {publish.video}
            </a>
          </div>
        )}
        
        {/* Mostrar enlaces si existen */}
        <div className="space-y-2 mb-4">
          {publish.link1 && (
            <div>
              <p className="text-sm font-medium">Enlace 1:</p>
              <a 
                href={publish.link1} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 text-sm hover:underline break-all"
              >
                {publish.link1}
              </a>
            </div>
          )}
          
          {publish.link2 && (
            <div>
              <p className="text-sm font-medium">Enlace 2:</p>
              <a 
                href={publish.link2} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 text-sm hover:underline break-all"
              >
                {publish.link2}
              </a>
            </div>
          )}
        </div>
        
        {/* Fecha de creación */}
        <p className="text-xs text-gray-500 mb-3">
          Creado: {new Date(publish.createdAt).toLocaleDateString()}
        </p>
        
        {/* Botones de acción */}
        <div className="flex justify-between border-t pt-3">
          <Link 
            href={`/administrators/publish/${publish.id}/edit`}
            className="text-blue-500 hover:underline text-sm font-medium"
          >
            Editar
          </Link>
          <button 
            onClick={onDelete}
            className="text-red-500 hover:underline text-sm font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}