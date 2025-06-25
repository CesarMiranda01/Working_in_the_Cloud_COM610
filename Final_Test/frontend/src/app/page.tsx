//app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Bienvenido a Trabajando en la Nube</h1>
      <p className="text-xl mb-8 max-w-lg">
        Una aplicación para gestionar usuarios y productos de manera eficiente.
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/administrators/auth/login" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Iniciar sesión
        </Link>
        <Link 
          href="/administrators/administrators/register" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}