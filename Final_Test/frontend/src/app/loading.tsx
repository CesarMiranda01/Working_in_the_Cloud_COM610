// src/app/loading.tsx
import React from 'react';

/**
 * Componente de carga global para la aplicación
 * Muestra un spinner animado mientras se carga el contenido
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner animado */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        
        {/* Texto de carga */}
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Cargando contenido...
        </p>
        
        {/* Progress bar opcional */}
        <div className="h-1 w-64 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-full w-1/3 animate-progress bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}