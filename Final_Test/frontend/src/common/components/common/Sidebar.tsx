import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">QMC Dashboard</h2>
        <p className="text-gray-300 text-sm mt-1">Bienvenido, {user?.firstName}</p>
      </div>
      
      <nav className="space-y-2">
        <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
          Inicio
        </Link>
        <Link href="/administrators/publish" className="block py-2 px-4 rounded hover:bg-gray-700">
          Listar Publicaciones
        </Link>
        <Link href="/administrators/publish/create" className="block py-2 px-4 rounded hover:bg-gray-700">
          Nueva Publicacion
        </Link>
        <Link href="/dashboard/profile" className="block py-2 px-4 rounded hover:bg-gray-700">
          Mi perfil
        </Link>
      </nav>
    </aside>
  );
}