// src/components/common/Header.tsx
"use client"; 

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { logout } from '@/lib/api/administrator';
import { useRouter } from 'next/navigation';


export default function Header() {
  // const { isAuthenticated, user, clearAuth } = useAuthStore();
  const { isAuthenticated, token, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. Primero hacer la llamada al backend
      await logout();
      
      // 2. Redirigir inmediatamente
      router.push('/administrators/auth/login');
      
      // 3. Forzar recarga del router
      router.refresh();
      
      // 4. Limpiar el estado (se ejecutará mientras se redirige)
      clearAuth();
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      clearAuth();
      router.push('/administrators/auth/login');
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              COM 610
            </Link>
          </div>
          
          <nav className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Inicio
                </Link>
                <Link href="/administrators/publish" className="text-gray-600 hover:text-gray-900">
                  Publicaciones
                </Link>
                <Link href="/dashboard/profile" className="text-gray-600 hover:text-gray-900">
                  Perfil
                </Link>
                <Link href="/contacts" className="text-gray-600 hover:text-gray-900">
                  Contactos
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                {/* <Link href="" className="text-gray-600 hover:text-gray-900">
                  Inicio
                </Link>
                <Link href="" className="text-gray-600 hover:text-gray-900">
                  Universidad
                </Link>
                <Link href="" className="text-gray-600 hover:text-gray-900">
                  Comunidad
                </Link> */}
                <Link href="/administrators/auth/login" className="text-gray-600 hover:text-gray-900">
                  Iniciar sesión
                </Link>
                <Link href="/administrators/administrators/register" className="text-gray-600 hover:text-gray-900">
                  Registrarse
                </Link>
                <Link href="/contacts" className="text-gray-600 hover:text-gray-900">
                  Contactos
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}